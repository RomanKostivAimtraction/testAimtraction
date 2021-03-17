import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { requeftFromYoutube, requeftFromYoutubeError, requeftFromYoutubeSuccess } from './main.reducer';
import { IData, IRowData, objFromYoutube } from '../shared/interfaces/main';
import { RequestsService } from '../shared/services/requests.service';



@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private requestService: RequestsService,) { }



  requeftFromYoutube$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requeftFromYoutube),
      switchMap((action) => {
        return this.requestService.getInfo<IData>(action.searchValue).pipe(map((data: IData) => {
          const dataForward: IRowData[] = data.items.map((elem: any) => {
            return {
              thumbnails: elem.snippet.thumbnails.medium.url,
              publishedAt: elem.snippet.publishedAt,
              title: elem,
              description: elem.snippet.description,
            };
          })
          return requeftFromYoutubeSuccess({ data: dataForward })
        }), catchError(err => {
          return of(requeftFromYoutubeError({ err }))
        }))
      })
    )
  )



}
