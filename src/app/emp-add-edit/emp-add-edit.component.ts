import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: any = [
    'Metriculation-X',
    'Diploma-XII',
    'Intermediate-XII',
    'Graduate',
    'Post-Graduate',
  ];
  private _dialogRef: any;
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialog: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      FirstName: '',
      LastName: '',
      Email: '',
      DOB: '',
      Gender: '',
      Education: '',
      Company: '',
      Experience: '',
      Package: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this._dialogRef.close(true)) {
      } else {
        this._empService.updateEmployee( this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Added Successfully');
            this._dialog.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee Added Successfully');
          this._dialog.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
