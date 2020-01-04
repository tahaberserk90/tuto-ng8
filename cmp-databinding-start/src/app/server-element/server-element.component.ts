import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit,OnChanges {
  ngOnChanges(changes:SimpleChanges) {
    console.log('ngOnChanges created');
    console.log(changes);
  }
  @Input('srvElement')
  element:{type:string,name:string,content:string};
  constructor() { 
    console.log('constructor created');
  }

  ngOnInit() {
    console.log('ngOnInit created');
  } 

}
