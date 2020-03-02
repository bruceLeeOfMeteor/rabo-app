import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './services/employees.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck, map, mergeMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from './interfaces/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  isSmallScreen: boolean;
  employees$: Observable<Employee[]>;

  selectedEmployeeId: string; // needed for highlighting selected employee in a list
  selectedEmployeeIdSubject: BehaviorSubject<string> = new BehaviorSubject('');
  selectedEmployee$: Observable<Employee>;

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

    this.selectedEmployee$ = this.selectedEmployeeIdSubject.pipe(
      tap(id => (this.selectedEmployeeId = id)),
      mergeMap(_ => this.employeesService.getList()), // ideally endpoint should be called with id parameter (Eg: getItem(id))
      tap(list => (this.selectedEmployeeId = !!this.selectedEmployeeId ? this.selectedEmployeeId : list[0].id)),
      map(list => list.find(employee => employee.id === this.selectedEmployeeId))
    );
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  selectEmployee(id: string) {
    this.selectedEmployeeIdSubject.next(id);
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
