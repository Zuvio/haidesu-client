import {Component} from '@angular/core';
import {AlertService} from "./alert.service";
import {Alert, AlertType, getAlertTypeFromString} from "./alert";
import {TitleCasePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'haidesu-alert',
  templateUrl: './alert.component.html',
  providers: [TitleCasePipe]
})
export class AlertComponent {

  constructor(public alerty: AlertService,
              private toasty: ToastrService,
              public accountservice : AccountService,
              private titlecasepipe: TitleCasePipe) { }
  addAlert(type: string) {
    console.log("Adding a "+ type +" alert");
    this.alerty.addAlert(new Alert({
      title: this.titlecasepipe.transform(type),
      type: getAlertTypeFromString(type),
      message: this.titlecasepipe.transform(type)+" alert popped up!"
    }));
  }
  showLocalStorage() {
    this.toasty.info(localStorage.getItem('user') || 'nothing here...', 'LocalStorage content');
    this.alerty.addAlert(new Alert({title: 'LocalStorage content', type: AlertType.Info, message: localStorage.getItem('user') || 'nothing here...'}));
  }
  public get alertType(): typeof AlertType {
    return AlertType;
  }

  showCurrentUser() {
    this.accountservice.user.subscribe(value => console.log(value));
  }
}
