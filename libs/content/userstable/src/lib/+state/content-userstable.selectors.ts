import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTENT_USERSTABLE_FEATURE_KEY,
  State,
  contentUserstableAdapter,
} from './content-userstable.reducer';

// Lookup the 'ContentUserstable' feature state managed by NgRx
export const getContentUserstableState = createFeatureSelector<State>(
  CONTENT_USERSTABLE_FEATURE_KEY
);

const { selectAll, selectEntities } = contentUserstableAdapter.getSelectors();

export const getContentUserstableLoaded = createSelector(
  getContentUserstableState,
  (state: State) => state.loaded
);

export const getContentUserstableError = createSelector(
  getContentUserstableState,
  (state: State) => state.error
);

export const getAllContentUserstable = createSelector(
  getContentUserstableState,
  (state: State) => selectAll(state)
);

export const getContentUserstableEntities = createSelector(
  getContentUserstableState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getContentUserstableState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getContentUserstableEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
