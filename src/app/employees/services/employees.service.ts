import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class EmployeesService {
  env = environment.moduleConfig.employees;
  constructor(private http: HttpClient) {}
  getList() {
    return this.http.get(`${this.env.baseUrl}/employees`).pipe(map(response => response['data'] || []));
  }
  create() {
    return this.http.post(`${this.env.baseUrl}/create`, {});
  }
}
