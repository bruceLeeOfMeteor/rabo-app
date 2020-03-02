import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './services/employees.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  isSmallScreen: boolean;
  employees$;
  constructor(
    private employeesService: EmployeesService,
    private _breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._breakpointObserver
      .observe(['(max-width: 901px)'])
      .pipe(pluck('matches'))
      .subscribe((m: boolean) => (this.isSmallScreen = m));

    this.employees$ = this.employeesService.getList();
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEmployeeDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
    });
  }
}
