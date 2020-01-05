import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private logger:LoggingService,private accountServ:AccountsService){}


  onSetTo(status: string) {
    this.accountServ.updateAccount(this.id,status);
    this.logger.logStatusChange(status);
  }
}
