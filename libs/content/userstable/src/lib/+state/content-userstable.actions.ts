import { createAction, props } from '@ngrx/store';
import { ContentUserstableEntity } from './content-userstable.models';

export const init = createAction('[ContentUserstable Page] Init');

export const loadContentUserstable = createAction(
  '[ContentUserstable/API] Load ContentUserstable'
);

export const loadContentUserstableSuccess = createAction(
  '[ContentUserstable/API] Load ContentUserstable Success',
  props<{ contentUserstable: ContentUserstableEntity[] }>()
);

export const loadContentUserstableFailure = createAction(
  '[ContentUserstable/API] Load ContentUserstable Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[trainingApp/add] Add User',
  props<{ user: ContentUserstableEntity }>()
);

export const addUserSuccess = createAction(
  '[trainingApp/add] Add User Success',
  props<{ user: ContentUserstableEntity }>()
);

export const addUserFailure = createAction(
  '[trainingApp/add] Add User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[trainingApp/update] Update User',
  props<{ id: number; user: ContentUserstableEntity }>()
);

export const updateUserSuccess = createAction(
  '[trainingApp/update] Update User Success',
  props<{ user: ContentUserstableEntity }>()
);

export const updateUserFailure = createAction(
  '[trainingApp/update] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[trainingApp/delete] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[trainingApp/delete] Delete User Success',
  props<{ user: ContentUserstableEntity }>()
);
export const deleteUserFailure = createAction(
  '[trainingApp/delete] Delete User Failure',
  props<{ error: any }>()
);
