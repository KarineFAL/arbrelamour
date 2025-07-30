
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, verifyPassword } from '../utils/users.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function register(req: Request, res: Response) {
  const { username, password } = req.body;
  if (findUserByUsername(username)) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }
  const user = createUser(username, password);
  res.status(201).json({ id: user.id, username: user.username });
}

export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user || !verifyPassword(user, password)) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}


export function home(req: Request, res: Response) {
  // force o TypeScript a entender que 'user' existe
  const user = (req as any).user;

  res.json({ message: `Bem vindo, ${user?.username}!` });
}

