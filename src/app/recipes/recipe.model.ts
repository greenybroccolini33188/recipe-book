import { Ingredient } from '../shared/ingredient.model';
import { Ingredients } from '../shared/typings';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredients;

  constructor(
    name: string,
    desc: string,
    imgPath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
    this.ingredients = ingredients;
  }
}
