import {Injectable} from '@angular/core';
import {Alert} from "../_models/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];

  addAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  removeAlert(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index,1);
  }

  clearAlerts() {
    this.alerts = [];
  }
}
