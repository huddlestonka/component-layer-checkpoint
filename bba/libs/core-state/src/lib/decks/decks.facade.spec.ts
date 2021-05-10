import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DecksFacade } from './decks.facade';
import * as DecksActions from './decks.actions';
import { initialDecksState } from './decks.reducer';

import { mockUser } from '@bba/testing';

describe('DecksFacade', () => {
  let facade: DecksFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecksFacade,
        provideMockStore({ initialState: initialDecksState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(DecksFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });
});
