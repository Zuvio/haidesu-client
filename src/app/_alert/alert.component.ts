import {Component} from '@angular/core';
import {AlertService} from "./alert.service";
import {Alert, AlertType, getAlertTypeFromString} from "./alert";
import {TitleCasePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'haidesu-alert',
  templateUrl: './alert.component.html',
  providers: [TitleCasePipe]
})
export class AlertComponent {

  constructor(public alerty: AlertService,
              private toasty: ToastrService,
              private titlecasepipe: TitleCasePipe) { }
  addAlert(type: string) {
    console.log("Adding a "+ type +" alert");
    this.alerty.addAlert(new Alert({
      type: getAlertTypeFromString(type),
      message: this.titlecasepipe.transform(type)+" alert popped up!"
    }));
  }
  showLocalStorage() {
    this.toasty.info(localStorage.getItem('user') || 'nope...', 'LocalStorage content');
    this.alerty.addAlert(new Alert({type: AlertType.Success, message: localStorage.getItem('user') || 'nope...'}));
  }
  public get alertType(): typeof AlertType {
    return AlertType;
  }
}
