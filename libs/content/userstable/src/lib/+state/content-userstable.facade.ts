import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ContentUserstableActions from './content-userstable.actions';
import * as ContentUserstableSelectors from './content-userstable.selectors';

@Injectable()
export class ContentUserstableFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(ContentUserstableSelectors.getContentUserstableLoaded)
  );
  allContentUserstable$ = this.store.pipe(
    select(ContentUserstableSelectors.getAllContentUserstable)
  );
  selectedContentUserstable$ = this.store.pipe(
    select(ContentUserstableSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ContentUserstableActions.init());
  }

  //分发Action
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
