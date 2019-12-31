import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles:[`
  .onLine{
    color:white;
  }
  `]
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offLine';

  constructor(){
    this.serverStatus=Math.random()>0.5?'onLine':'offLine';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor(){
    return this.serverStatus==='onLine' ? 'green':'red';
  }
}
