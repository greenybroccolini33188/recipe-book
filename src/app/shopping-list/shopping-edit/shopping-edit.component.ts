import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) private nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false })
  private amountInputRef: ElementRef;
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  public onAddItem(): void {
    const ingredientName: string = (<HTMLInputElement>(
      this.nameInputRef.nativeElement
    )).value;
    const ingredientAmount: number = parseInt(
      (<HTMLInputElement>this.amountInputRef.nativeElement).value,
      10
    );

    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.slService.addIngredient(newIngredient);
  }
}
