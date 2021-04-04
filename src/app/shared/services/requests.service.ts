import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const apiKey = 'AIzaSyB3GVWc8NIjn8B2-BbzW-AOko2lfOHgTKw';

@Injectable()
export class RequestsService {
  
  constructor(
    private http: HttpClient
  ) { }

  getInfo<T>(searchValue: string): Observable<T> {
    return this.http.get<T>(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=${searchValue}`);
  }
}
