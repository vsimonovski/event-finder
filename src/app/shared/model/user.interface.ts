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
