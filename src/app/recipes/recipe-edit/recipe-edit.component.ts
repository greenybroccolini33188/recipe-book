import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public id: number;
  public editMode: boolean = false;
  private paramsSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params: Params): void => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('edit mode:', this.editMode);
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
