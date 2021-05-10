import { User } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockUsersFacade = {
  loadUsers: () => {},
  selectUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  createUser: () => {},
  mutations$: of(true),
};

export const mockUsersService = {
  all: () => of([]),
  find: () => of({ ...mockUser }),
  create: () => of({ ...mockUser }),
  update: () => of({ ...mockUser }),
  delete: () => of({ ...mockUser }),
};

export const mockUser: User = {
  id: '0',
  title: 'mock',
  firstName: 'mock',
  lastName: 'mock',
  email: 'mock',
  password: 'mock',
  role: 'mock',
  description: 'mock',
  profilePic: 'mock',
};

export const mockEmptyUser: User = {
  id: null,
  title: 'mockEmpty',
  firstName: 'mockEmpty',
  lastName: 'mockEmpty',
  email: 'mockEmpty',
  password: 'mockEmpty',
  role: 'mockEmpty',
  description: 'mockEmpty',
  profilePic: 'mockEmpty',
};
