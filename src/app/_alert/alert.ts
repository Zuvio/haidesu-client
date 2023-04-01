export class Alert {
  type?: AlertType;
  message?: string;

  constructor(data: Partial<Alert>) {
    Object.assign(this, data);
  }

}

export enum AlertType {
  Success = 'succes',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export function getAlertTypeFromString(typeString: string): AlertType | undefined {
  return typeString as AlertType;
}
