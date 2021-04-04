import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AppEffects } from './app.effects';
import { RequestsService } from '../shared/services/requests.service';
import { Action } from '@ngrx/store';


describe('AppEffects', () => {
  // let actions$: Observable<any>;
  let effects: AppEffects;
  let requeftFromYoutube$ = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        HttpHandler,
        HttpClient,
        RequestsService,
        provideMockActions(() => requeftFromYoutube$)
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
