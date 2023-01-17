import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toast: NgToastService) {}

  success(message: string): void {
    this.toast.success({
      detail: 'Success',
      summary: message,
      // sticky: true,
      position: 'tr',
      duration: 3000,
    });
  }

  info(message: string): void {
    this.toast.info({
      detail: 'Info',
      summary: message,
      // sticky: true,
      position: 'tr',
      duration: 3000,
    });
  }
  warning(message: string): void {
    this.toast.warning({
      detail: 'Warning',
      summary: message,
      // sticky: true,
      position: 'tr',
      duration: 3000,
    });
  }

  error(message: string): void {
    this.toast.error({
      detail: 'Error occurred',
      summary: message,
      // sticky: true,
      position: 'tr',
      duration: 3000,
    });
  }
}
