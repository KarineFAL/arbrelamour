import bcrypt from 'bcryptjs';

interface User {
  id: number;
  username: string;
  passwordHash: string;
}

const users: User[] = [];

export function createUser(username: string, password: string): User {
  const passwordHash = bcrypt.hashSync(password, 8);
  const user = { id: users.length + 1, username, passwordHash };
  users.push(user);
  return user;
}

export function findUserByUsername(username: string): User | undefined {
  return users.find(u => u.username === username);
}

export function verifyPassword(user: User, password: string): boolean {
  return bcrypt.compareSync(password, user.passwordHash);
}

interface User {
  id: number;
  username: string;
  passwordHash: string;
}
