import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class EmployeesService {
  env = environment.moduleConfig.employees;
  constructor(private http: HttpClient) {}
  getList(): Observable<Employee[]> {
    return this.http.get<EmployeesResponse>(`${this.env.baseUrl}/employees`).pipe(map(response => response.data || []));
  }
  create() {
    return this.http.post(`${this.env.baseUrl}/create`, {});
  }
}

interface EmployeesResponse {
  status: string;
  data: Employee[];
}
