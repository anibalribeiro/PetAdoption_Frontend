import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 3000,
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['style-error'],
    duration: 5000,
  };

  public openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }

  public snackbarSuccess(message: string) {
    this.snackBar.open(message, 'close', this.configSuccess);
  }

  public snackbarError(message: string) {
    this.snackBar.open(message, 'close', this.configError);
  }
}
