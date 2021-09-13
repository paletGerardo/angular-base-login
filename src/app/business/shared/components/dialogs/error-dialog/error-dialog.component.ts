import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component( {
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: [ './error-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ErrorDialogComponent implements OnInit {
  constructor(
    @Inject( MAT_DIALOG_DATA )
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
  ) {}

  ngOnInit(): void {

  }

  cerrarPopUp() {
    this.dialogRef.close();
  }
}
