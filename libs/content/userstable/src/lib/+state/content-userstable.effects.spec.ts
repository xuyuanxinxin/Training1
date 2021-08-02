import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ContentUserstableActions from './content-userstable.actions';
import { ContentUserstableEffects } from './content-userstable.effects';

describe('ContentUserstableEffects', () => {
  let actions: Observable<Action>;
  let effects: ContentUserstableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ContentUserstableEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ContentUserstableEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ContentUserstableActions.init() });

      const expected = hot('-a-|', {
        a: ContentUserstableActions.loadContentUserstableSuccess({
          contentUserstable: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
