import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../../shared/typings';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipes;
  private recipesSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipes): void => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
