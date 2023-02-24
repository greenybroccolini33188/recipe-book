import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      .cursor-pointer {
        cursor: pointer;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  public collapsed: boolean;

  constructor() {}

  ngOnInit(): void {
    this.collapsed = true;
  }

  public setCollapsedState(collapsedState: boolean): void {
    this.collapsed = collapsedState;
  }
}
