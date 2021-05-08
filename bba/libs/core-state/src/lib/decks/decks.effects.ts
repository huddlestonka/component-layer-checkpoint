import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DecksFeature from './decks.reducer';
import * as DecksActions from './decks.actions';

@Injectable()
export class DecksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DecksActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DecksActions.loadDecksSuccess({ decks: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DecksActions.loadDecksFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
