import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') private isOpen: boolean;

  @HostListener('document:click', ['$event']) private toggleOpen(): void {
    const { target }: { target: EventTarget } = event;
    this.isOpen = this.elRef.nativeElement.contains(target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.isOpen = false;
  }
}
