import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ContentUserstableActions from './content-userstable.actions';
import { ContentUserstableEffects } from './content-userstable.effects';
import { ContentUserstableFacade } from './content-userstable.facade';
import { ContentUserstableEntity } from './content-userstable.models';
import {
  CONTENT_USERSTABLE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './content-userstable.reducer';
import * as ContentUserstableSelectors from './content-userstable.selectors';

interface TestSchema {
  contentUserstable: State;
}

describe('ContentUserstableFacade', () => {
  let facade: ContentUserstableFacade;
  let store: Store<TestSchema>;
  const createContentUserstableEntity = (
    id: string,
    name = ''
  ): ContentUserstableEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONTENT_USERSTABLE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ContentUserstableEffects]),
        ],
        providers: [ContentUserstableFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ContentUserstableFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allContentUserstable$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allContentUserstable$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadContentUserstableSuccess` to manually update list
     */
    it('allContentUserstable$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allContentUserstable$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ContentUserstableActions.loadContentUserstableSuccess({
          contentUserstable: [
            createContentUserstableEntity('AAA'),
            createContentUserstableEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allContentUserstable$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
