export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Login {
  email: string;
  password: string;
}

export interface User extends BaseEntity {
  title: string;
  role: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface Deck extends BaseEntity {
  title: string;
  cards?: Card[];
  format: string;
}

export interface Card extends BaseEntity {
  title: string;
  description: string;
  deckId: any;
  manaCost: Map<string, number>[];
  textBox: string;
  typeLine: string;
  stats: string;
}

export interface DeckAuthor extends BaseEntity {
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  decks?: Deck[];
}
