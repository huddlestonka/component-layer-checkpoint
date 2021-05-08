import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DecksEffects } from './decks.effects';
import * as DecksActions from './decks.actions';

describe('DecksEffects', () => {
  let actions: Observable<any>;
  let effects: DecksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DecksEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(DecksEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DecksActions.init() });

      const expected = hot('-a-|', {
        a: DecksActions.loadDecksSuccess({ decks: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
