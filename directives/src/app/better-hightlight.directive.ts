import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHightlight]'
})
export class BetterHightlightDirective implements OnInit {

  @Input()
  defaultColor:string='transparent';
  @Input()
  heightlightColor:string='blue';

  @HostBinding('style.backgroundColor')
  backgroundColor:string;

  constructor(private renderer:Renderer2,private elementRef:ElementRef) { }

  ngOnInit(){
    this.backgroundColor=this.defaultColor;
    //this.renderer.setStyle(this.elementRef.nativeElement,'background-color','blue');
  }

  @HostListener('mouseenter')
  mouseOver(eventdata:Event){
    //this.renderer.setStyle(this.elementRef.nativeElement,'background-color','blue');
    this.backgroundColor=this.heightlightColor;
  }

  @HostListener('mouseleave')
  mouseLeave(eventdata:Event){
    //this.renderer.setStyle(this.elementRef.nativeElement,'background-color','transparent');
    this.backgroundColor=this.defaultColor;
  }

}
