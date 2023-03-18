import {Component} from '@angular/core';
import {AlertService} from "../_services/alert.service";
import {Alert, getAlertTypeFromString} from "../_models/alert";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'haidesu-home',
  templateUrl: './home.component.html',
  providers: [TitleCasePipe]
})
export class HomeComponent {
  constructor(public alertService: AlertService,
              private titlecasepipe: TitleCasePipe) { }
  addAlert(type: string) {
    console.log("Adding a "+ type +" alert");
    this.alertService.addAlert(new Alert({
      type: getAlertTypeFromString(type),
      message: this.titlecasepipe.transform(type)+" alert popped up!",
      duration: 200
    }));
  }
}
