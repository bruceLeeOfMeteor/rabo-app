import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  env = environment.moduleConfig.employees;
  constructor(private http: HttpClient) {}
  getList() {
    return this.http.get(`${this.env.baseUrl}/employees`);
  }
  create() {
    return this.http.post(`${this.env.baseUrl}/create`, {});
  }
}
