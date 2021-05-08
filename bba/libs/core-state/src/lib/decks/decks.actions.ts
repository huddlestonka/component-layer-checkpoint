import { createAction, props } from '@ngrx/store';
import { DecksEntity } from './decks.models';

export const init = createAction('[Decks Page] Init');

export const loadDecksSuccess = createAction(
  '[Decks/API] Load Decks Success',
  props<{ decks: DecksEntity[] }>()
);

export const loadDecksFailure = createAction(
  '[Decks/API] Load Decks Failure',
  props<{ error: any }>()
);
