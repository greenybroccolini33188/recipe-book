import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() public featureSelected: EventEmitter<string> =
    new EventEmitter<string>();
  public collapsed: boolean;

  constructor() {}

  ngOnInit(): void {
    this.collapsed = true;
  }

  public onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  public setCollapsedState(collapsedState: boolean): void {
    this.collapsed = collapsedState;
  }
}
