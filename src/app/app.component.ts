import {Component} from '@angular/core';
import {AlertService} from "./_services/alert.service";

@Component({
  selector: 'haidesu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'haidesu-client';
  constructor(public alertService: AlertService) {
  }

}
