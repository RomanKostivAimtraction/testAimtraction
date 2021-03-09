import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class RequestsService {

  constructor(
    private http: HttpClient
  ) { }

  getInfo<T>(url: string): Observable<T> {
    return this.http.get<T>(`${url}`);
  }
}
