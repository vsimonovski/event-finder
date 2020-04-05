export interface User {
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LocalStorageUser {
  username: string;
  password: string;
  id: number;
}
