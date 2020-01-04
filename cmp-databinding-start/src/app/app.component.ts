import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type:'server',name:'test',content:'the rest'}];
  
  onServerAdded(serverDara:{serverName:string,serverContent:string}) {
     this.serverElements.push({
      type: 'server',
      name: serverDara.serverName,
      content: serverDara.serverContent
    }); 
  }

  onBlueprintAdded(bluePrintData:{blName:string,blContent:string}) {
     this.serverElements.push({
      type: 'blueprint',
      name: bluePrintData.blName,
      content: bluePrintData.blContent
    }); 
  }

  
}
