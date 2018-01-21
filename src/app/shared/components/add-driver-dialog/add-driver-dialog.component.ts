import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'app-add-driver-dialog',
  templateUrl: './add-driver-dialog.component.html',
  styleUrls: ['./add-driver-dialog.component.scss']
})
export class AddDriverDialogComponent implements OnInit {
  bankForm: FormGroup;
  formErrors: any;
  constructor(public dialogRef: MatDialogRef<AddDriverDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeMe(): void {
    this.dialogRef.close();
  }
}
