import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MySnackbarService {
   constructor(private snackBar: MatSnackBar) {}

   openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: "right",
      panelClass: [className],
    });
  }
  openErrorSnackBar(message: string, action: string | "close") {
    this.openSnackBar(message, action, "my-snack-bar-error");
  }
  openSuccessSnackBar(message: string, action: string | "close") {
    this.openSnackBar(message, action, "my-snack-bar-success");
  }
}