import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly title: string = 'recipe-book';
  public loadedFeature: string;

  constructor() {}

  ngOnInit(): void {
    this.loadedFeature = 'recipe';
  }

  public onNavigate(feature: string): void {
    this.loadedFeature = feature;
  }
}
