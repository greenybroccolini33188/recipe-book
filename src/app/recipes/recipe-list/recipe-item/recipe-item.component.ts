import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipe: Recipe;
  @Input() public index: number;

  ngOnInit(): void {}

  public slugify(text: string): string {
    return text.replace(/[_\-\(\)\[\]\s]+/, '-');
  }
}
