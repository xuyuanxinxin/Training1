import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ContentUserstableActions from './content-userstable.actions';
import { ContentUserstableEntity } from './content-userstable.models';

export const CONTENT_USERSTABLE_FEATURE_KEY = 'contentUserstable';

export interface State extends EntityState<ContentUserstableEntity> {
  selectedId?: string | number; // which ContentUserstable record has been selected
  loaded: boolean; // has the ContentUserstable list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContentUserstablePartialState {
  readonly [CONTENT_USERSTABLE_FEATURE_KEY]: State;
}

export const contentUserstableAdapter: EntityAdapter<ContentUserstableEntity> =
  createEntityAdapter<ContentUserstableEntity>({
    selectId: (user: ContentUserstableEntity) => user.Number,
  });

export const initialState: State = contentUserstableAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const contentUserstableReducer = createReducer(
  initialState,
  on(ContentUserstableActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ContentUserstableActions.loadContentUserstableSuccess,
    (state, { contentUserstable }) =>
      contentUserstableAdapter.setAll(contentUserstable, {
        ...state,
        loaded: true,
      })
  ),
  on(
    ContentUserstableActions.loadContentUserstableFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(ContentUserstableActions.addUserSuccess, (state, { user }) =>
    contentUserstableAdapter.addOne(user, {
      ...state,
      loaded: true,
      selectedId: user.Number,
    })
  ),
  on(ContentUserstableActions.addUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ContentUserstableActions.updateUserSuccess, (state, { user }) =>
    contentUserstableAdapter.upsertOne(user, {
      ...state,
      loaded: true,
      selectedId: user.Number,
    })
  ),
  on(ContentUserstableActions.deleteUserSuccess, (state, { user }) =>
    contentUserstableAdapter.removeOne(user.Number, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return contentUserstableReducer(state, action);
}
