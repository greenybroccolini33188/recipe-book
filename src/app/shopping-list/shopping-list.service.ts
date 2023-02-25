import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Ingredients } from '../shared/typings';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public ingredientsChanged: Subject<Ingredients> = new Subject<Ingredients>();

  private ingredients: Ingredients = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Bread', 2),
    new Ingredient('Chocolate', 7),
  ];

  constructor() {}

  public getIngredients(): Ingredients {
    // return copy of ingredients array
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.emitIngredientsChanged();
  }

  public addIngredients(ingredients: Ingredients): void {
    this.ingredients.push(...ingredients);
    this.emitIngredientsChanged();
  }

  private emitIngredientsChanged(): void {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
