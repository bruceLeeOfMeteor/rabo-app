import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Component({
  selector: 'app-employee-details-profile',
  templateUrl: './employee-details-profile.component.html',
  styleUrls: ['./employee-details-profile.component.scss']
})
export class EmployeeDetailsProfileComponent {
  @Input() employee: Employee;
  @Input() isLoading: boolean;
}
