import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
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
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params: Params): void => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      // console.log('edit mode:', this.editMode);
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
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }

  public onSubmit(): void {
    console.log(this.recipeForm);
  }

  public onAddIngredient(): void {
    this.Ingredients.push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }
}
