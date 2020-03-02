import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';

@NgModule({
  declarations: [EmployeesComponent, CreateEmployeeDialogComponent],
  imports: [CommonModule, EmployeesRoutingModule, HttpClientModule, AppMaterialModule]
})
export class EmployeesModule {}
