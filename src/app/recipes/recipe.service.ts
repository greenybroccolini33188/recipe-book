import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredients, Recipes } from '../shared/typings';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  public recipesChanged: Subject<Recipes> = new Subject<Recipes>();
  private recipes: Recipes = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaG2cfLMIULCNfKLV82l_8K1f7iX_Go-85M_5eCTDxvExQpgNl4s7UWq4YMrsJmI3SURRuGhV7Luu9uHFB53QAu2WnW9E-FN0ollJHgNMMBEjJz2FGuzfFQfBKV5LFWzPztxjgSM9DtPpKrr-qrPlMQJrGwkvEcMxEXeUZSLMBW3_WIR73p-UO4gU30Q/s1280/cheese-garlic-bread-min.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Recipe 2',
      'Recipe 2 Description',
      'https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      'Recipe no. 3',
      'This is the 3rd recipe',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/master/pass/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg',
      []
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  public getRecipes(): Recipes {
    // return copy of recipes array
    return this.recipes.slice();
  }

  /**
   * Return single recipe
   * @param index the ID of the recipe
   */
  public getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  public addIngredientsToShoppingList(ingredients: Ingredients): void {
    this.slService.addIngredients(ingredients);
    this.recipesChanged.next(this.getRecipes());
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  public updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }
}
