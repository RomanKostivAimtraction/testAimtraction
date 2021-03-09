import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsService {

  constructor(
    private http: HttpClient
  ) { }

  getInfo(url) {
    return this.http.get<any>(`${url}`);
  }
}
