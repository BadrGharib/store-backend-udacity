import express, { Request, Response } from 'express';
import { User, UserStore } from '../model/users';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../services/verification';

const store = new UserStore();
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id as unknown as number);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    password: _req.body.password,
  };
  try {
    let newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    newUser.token = token;
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
};
export default users_routes;
