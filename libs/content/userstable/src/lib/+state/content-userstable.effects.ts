import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { catchError, map } from 'rxjs/operators';
import { UserDataService } from '@training-app/backend';

import * as ContentUserstableActions from './content-userstable.actions';
import * as ContentUserstableFeature from './content-userstable.reducer';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ContentUserstableEffects {
  //查询数据Effect
  init$ = createEffect(() =>
    this.dataPresistence.fetch(ContentUserstableActions.loadContentUserstable, {
      run: (action) => {
        return this.dataService.getUsers().pipe(
          map((data) =>
            ContentUserstableActions.loadContentUserstableSuccess({
              contentUserstable: data,
            })
          ),
          catchError((err) =>
            of(
              ContentUserstableActions.loadContentUserstableFailure({
                error: (err as HttpErrorResponse).message,
              })
            )
          )
        );
      },
      onError: (action, error) => {
        console.error('Error', error);
        return ContentUserstableActions.loadContentUserstableFailure({
          error,
        });
      },
    })
  );

  //添加用户Effect
  addUser$ = createEffect(() =>
    this.dataPresistence.fetch(ContentUserstableActions.addUser, {
      run: (action: any) => {
        return this.dataService.addUser(action.user).pipe(
          map((data) =>
            ContentUserstableActions.addUserSuccess({ user: data })
          ),
          catchError((err) =>
            of(
              ContentUserstableActions.addUserFailure({
                error: (err as HttpErrorResponse).message,
              })
            )
          )
        );
      },
      onError: (action, error) => {
        return ContentUserstableActions.addUserFailure({ error: error });
      },
    })
  );

  //更新用户Effect
  updateUser$ = createEffect(() =>
    this.dataPresistence.fetch(ContentUserstableActions.updateUser, {
      run: (action: any) => {
        return this.dataService
          .updateUser(action.id, action.user)
          .pipe(
            map((data) =>
              ContentUserstableActions.updateUserSuccess({ user: data })
            )
          );
      },
    })
  );

  //删除用户Effect
  deleteUser$ = createEffect(() =>
    this.dataPresistence.fetch(ContentUserstableActions.deleteUser, {
      run: (action: any) => {
        return this.dataService
          .deleteUser(action.id)
          .pipe(
            map((data) =>
              ContentUserstableActions.deleteUserSuccess({ user: data })
            )
          );
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private dataPresistence: DataPersistence<ContentUserstableFeature.State>,
    private dataService: UserDataService
  ) {}
}
