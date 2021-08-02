import { ContentUserstableEntity } from './content-userstable.models';
import {
  contentUserstableAdapter,
  ContentUserstablePartialState,
  initialState,
} from './content-userstable.reducer';
import * as ContentUserstableSelectors from './content-userstable.selectors';

describe('ContentUserstable Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContentUserstableId = (it: ContentUserstableEntity) => it.id;
  const createContentUserstableEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContentUserstableEntity);

  let state: ContentUserstablePartialState;

  beforeEach(() => {
    state = {
      contentUserstable: contentUserstableAdapter.setAll(
        [
          createContentUserstableEntity('PRODUCT-AAA'),
          createContentUserstableEntity('PRODUCT-BBB'),
          createContentUserstableEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('ContentUserstable Selectors', () => {
    it('getAllContentUserstable() should return the list of ContentUserstable', () => {
      const results = ContentUserstableSelectors.getAllContentUserstable(state);
      const selId = getContentUserstableId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ContentUserstableSelectors.getSelected(
        state
      ) as ContentUserstableEntity;
      const selId = getContentUserstableId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getContentUserstableLoaded() should return the current "loaded" status', () => {
      const result =
        ContentUserstableSelectors.getContentUserstableLoaded(state);

      expect(result).toBe(true);
    });

    it('getContentUserstableError() should return the current "error" state', () => {
      const result =
        ContentUserstableSelectors.getContentUserstableError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
