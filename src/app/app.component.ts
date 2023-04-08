import {Component} from '@angular/core';
import {User} from "./_models/user";
import {AccountService} from "./_services/account.service";

@Component({
  selector: 'haidesu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'haidesu-client';
  user?: User | null;
  constructor(public accountService: AccountService) {
    // subscribe to the accountservice user that has a value of either User or null and assign it to the local this.user
    this.accountService.user.subscribe(user => this.user = user);
  }
  logout() {
    this.accountService.logout();
  }
}
