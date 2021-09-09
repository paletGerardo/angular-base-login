import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ce-not-registered-dialog',
  templateUrl: './not-registered-dialog.component.html',
  styleUrls: ['./not-registered-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotRegisteredDialogComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<NotRegisteredDialogComponent>
  ) {}

  onCreateAccountClick() {
    this.router.navigate(['/create-account']);
    this.dialogRef.close();
  }
}
