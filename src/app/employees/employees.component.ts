import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees$;
  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.employees$ = this.employeesService.getList();
  }
}
