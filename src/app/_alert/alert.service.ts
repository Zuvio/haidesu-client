import {Injectable} from '@angular/core';
import {Alert, AlertType} from "./alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];

  success(message: string, title: string) {
    this.addAlert(new Alert({title: title, type: AlertType.Success, message: message}))
  }
  error(message: string, title: string) {
    this.addAlert(new Alert({title: title, type: AlertType.Error, message: message}))
  }
  warning(message: string, title: string) {
    this.addAlert(new Alert({title: title, type: AlertType.Warning, message: message}))
  }
  info(message: string, title: string) {
    this.addAlert(new Alert({title: title, type: AlertType.Info, message: message}))
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
