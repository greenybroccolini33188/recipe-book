import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public id: number;
  public editMode: boolean = false;
  private paramsSub: Subscription;
  public recipeForm: FormGroup;

  get controls(): AbstractControl<any, any>[] {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get Ingredients(): FormArray<any> {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params: Params): void => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  private initForm(): void {
    let recipeName: string = '',
      recipeImagePath: string = '',
      recipeDescription: string = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/), // only positive numbers
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }

  public onSubmit(): void {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.navigateToRecipesList();
  }

  public onAddIngredient(): void {
    this.Ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/), // only positive numbers
        ]),
      })
    );
  }

  public onCancel(): void {
    this.navigateToRecipesList();
  }

  public onDeleteIngredient(index: number): void {
    this.Ingredients.removeAt(index);
  }

  public clearAllIngredients(): void {
    this.Ingredients.clear();
  }

  private navigateToRecipesList(): void {
    this.router.navigate(['../'], { relativeTo: this.route }).then().catch();
  }
}
