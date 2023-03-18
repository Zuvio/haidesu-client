import {Component} from '@angular/core';
import {AlertService} from "../_services/alert.service";
import {AlertType} from "../_models/alert";

@Component({
  selector: 'haidesu-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {

  constructor(public alertservice: AlertService) {
  }

  public get alertType(): typeof AlertType {
    return AlertType;
  }
}
