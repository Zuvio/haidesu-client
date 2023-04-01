import {Injectable} from '@angular/core';
import {Alert, AlertType} from "./alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];

  success(message: string) {
    this.addAlert(new Alert({type: AlertType.Success, message: message}))
  }

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
