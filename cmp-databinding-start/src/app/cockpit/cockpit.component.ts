import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output()
  serverCreated=new EventEmitter<{serverName:string,serverContent:string}>();
  @Output()
  bluePrintCreated=new EventEmitter<{blName:string,blContent:string}>();;

 // newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContent',{static: false})
  serverContentInput:ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onAddServer(serverNameInput:HTMLInputElement) {
    this.serverCreated.emit(
      {
        serverName:serverNameInput.value,
        serverContent:this.serverContentInput.nativeElement.value
      }
      )
  }

  onAddBlueprint(serverNameInput:HTMLInputElement) {
    this.bluePrintCreated.emit(
      {
        blName:serverNameInput.value,
        blContent:this.serverContentInput.nativeElement.value
      }
      )
  }

}
