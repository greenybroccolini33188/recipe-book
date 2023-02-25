import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../../shared/typings';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipes;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
