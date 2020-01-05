import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')
  isopen=false;

  @HostListener('document:click', ['$event'])
  onToggleOpen(event:Event){
    this.isopen=this.elRef.nativeElement.contains(event.target) ? !this.isopen : false;;
  }

  constructor(private elRef:ElementRef) { }

}
