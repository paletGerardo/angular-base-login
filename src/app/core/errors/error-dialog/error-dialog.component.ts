import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorConfig } from "../../http/http.service";


@Component( {
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: [ './error-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ErrorDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorConfig
  ) {}

  ngOnInit(): void {
  console.log(this.data)
  }

  cerrarPopUp() {
    this.dialogRef.close();
  }
}
