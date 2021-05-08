import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { UsersFacade } from './users/users.facade';
import * as fromDecks from './decks/decks.reducer';
import { DecksEffects } from './decks/decks.effects';
import { DecksFacade } from './decks/decks.facade';
import * as fromCards from './cards/cards.reducer';
import { CardsEffects } from './cards/cards.effects';
import { CardsFacade } from './cards/cards.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature(fromDecks.DECKS_FEATURE_KEY, fromDecks.reducer),
    EffectsModule.forFeature([DecksEffects]),
    StoreModule.forFeature(fromCards.CARDS_FEATURE_KEY, fromCards.reducer),
    EffectsModule.forFeature([CardsEffects]),
  ],
  providers: [UsersFacade, DecksFacade, CardsFacade],
})
export class CoreStateModule {}
