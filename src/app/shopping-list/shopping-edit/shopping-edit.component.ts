import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) public slForm: NgForm;
  private slSubscription: Subscription;
  public editMode: boolean = false;
  public editedItemIndex: number;
  public editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.slSubscription = this.slService.startedEditing.subscribe(
      (index: number): void => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        const { name, amount }: { name: string; amount: number } =
          this.editedItem;
        this.slForm.setValue({ name, amount });
      }
    );
  }

  ngOnDestroy(): void {
    this.slSubscription.unsubscribe();
  }

  public onSubmit(form: NgForm): void {
    const { name, amount }: { name: string; amount: number } = form.value;
    const newIngredient: Ingredient = new Ingredient(name, amount);
    this.editMode
      ? this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      : this.slService.addIngredient(newIngredient);

    this.onClear();
  }

  public onClear(): void {
    this.slForm.resetForm();
    this.editMode = false;
  }

  public onDelete(): void {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
