import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmployeeData } from '../interfaces/employee';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.scss']
})
export class CreateEmployeeDialogComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(`[a-zA-Z ']*`)]);
  ageFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  salaryFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);

  matcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<CreateEmployeeDialogComponent>) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.nameFormControl.valid && this.ageFormControl.value && this.salaryFormControl.value) {
      this.dialogRef.close({
        name: this.nameFormControl.value,
        age: this.ageFormControl.value,
        salary: this.salaryFormControl.value
      } as EmployeeData);
    }
  }
}
