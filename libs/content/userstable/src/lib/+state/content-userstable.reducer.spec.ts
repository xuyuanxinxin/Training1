import { Action } from '@ngrx/store';

import * as ContentUserstableActions from './content-userstable.actions';
import { ContentUserstableEntity } from './content-userstable.models';
import { State, initialState, reducer } from './content-userstable.reducer';

describe('ContentUserstable Reducer', () => {
  const createContentUserstableEntity = (
    id: string,
    name = ''
  ): ContentUserstableEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid ContentUserstable actions', () => {
    it('loadContentUserstableSuccess should return the list of known ContentUserstable', () => {
      const contentUserstable = [
        createContentUserstableEntity('PRODUCT-AAA'),
        createContentUserstableEntity('PRODUCT-zzz'),
      ];
      const action = ContentUserstableActions.loadContentUserstableSuccess({
        contentUserstable,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
