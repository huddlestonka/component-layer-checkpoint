import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CardsEffects } from './cards.effects';
import * as CardsActions from './cards.actions';

describe('CardsEffects', () => {
  let actions: Observable<any>;
  let effects: CardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CardsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CardsActions.init() });

      const expected = hot('-a-|', {
        a: CardsActions.loadCardsSuccess({ cards: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
