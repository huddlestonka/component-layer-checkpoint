import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DecksActions from './decks.actions';
import { DecksEntity } from './decks.models';

export const DECKS_FEATURE_KEY = 'decks';

export interface State extends EntityState<DecksEntity> {
  selectedId?: string | number; // which Decks record has been selected
  loaded: boolean; // has the Decks list been loaded
  error?: string | null; // last known error (if any)
}

export interface DecksPartialState {
  readonly [DECKS_FEATURE_KEY]: State;
}

export const decksAdapter: EntityAdapter<DecksEntity> = createEntityAdapter<DecksEntity>();

export const initialState: State = decksAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const decksReducer = createReducer(
  initialState,
  on(DecksActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(DecksActions.loadDecksSuccess, (state, { decks }) =>
    decksAdapter.setAll(decks, { ...state, loaded: true })
  ),
  on(DecksActions.loadDecksFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return decksReducer(state, action);
}
