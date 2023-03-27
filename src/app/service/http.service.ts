import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  private baseUrl: string = "http://localhost:8080/employeepayrollservice/";

  constructor(private httpClient: HttpClient) {

  }

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "get");
  }

  addEmployee(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "create", body);
  }

  deleteEmployeeData(employeeId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "delete/" + employeeId);
  }

  updateEmployeData(id: number, body: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "update/" + id, body);
  }
}
