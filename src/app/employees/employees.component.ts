import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './services/employees.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck, map, mergeMap, tap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Employee } from './interfaces/employee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  isSmallScreen: boolean;
  employees$: Observable<Employee[]>;
  isLoadingList = true;
  isLoadingDetails = true;

  selectedEmployeeId: string; // needed for highlighting selected employee in a list
  selectedEmployeeIdSubject: BehaviorSubject<string> = new BehaviorSubject('');
  selectedEmployee$: Observable<Employee>;

  searchQuery: string;

  constructor(
    private employeesService: EmployeesService,
    private _breakpointObserver: BreakpointObserver,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._breakpointObserver
      .observe(['(max-width: 901px)'])
      .pipe(pluck('matches'))
      .subscribe((m: boolean) => (this.isSmallScreen = m));

    this.employees$ = this.employeesService.getList().pipe(tap(_ => (this.isLoadingList = false)));

    this.selectedEmployee$ = this.selectedEmployeeIdSubject.pipe(
      tap(_ => (this.isLoadingDetails = true)),
      tap(id => (this.selectedEmployeeId = id)),
      mergeMap(_ => this.employeesService.getList()), // ideally endpoint should be called with id parameter (Eg: getItem(id))
      tap(list => (this.selectedEmployeeId = !!this.selectedEmployeeId ? this.selectedEmployeeId : list[0].id)),
      map(list => list.find(employee => employee.id === this.selectedEmployeeId)),
      tap(_ => (this.isLoadingDetails = false))
    );
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  selectEmployee(id: string) {
    this.selectedEmployeeIdSubject.next(id);
  }

  search(query: string) {
    this.searchQuery = query;
  }

  filterEmplyees(employees: Employee[], query): Employee[] {
    return employees.filter(employee => !query || employee.employee_name.includes(query));
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(CreateEmployeeDialogComponent, {
      width: '600px'
    });

    dialogRef
      .afterClosed()
      .pipe(mergeMap(data => (data ? this.employeesService.create(data) : of())))
      .subscribe(
        response => this._snackBar.open('New employee has successfully been added', 'OK', { duration: 2000 }),
        error => this._snackBar.open('Oops, something went wrong', 'OK', { duration: 2000 })
      );
  }
}
