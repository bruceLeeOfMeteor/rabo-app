import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';
import { EmployeeDetailsProfileComponent } from './employee-details-profile/employee-details-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [EmployeesComponent, CreateEmployeeDialogComponent, EmployeeDetailsProfileComponent, SearchBoxComponent],
  imports: [CommonModule, EmployeesRoutingModule, HttpClientModule, AppMaterialModule, FormsModule, ReactiveFormsModule]
})
export class EmployeesModule {}
