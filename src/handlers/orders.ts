import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../model/orders';
import { verifyAuthToken } from '../services/verification';

const store = new OrderStore();
const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (_req: Request, res: Response) => {
  const order: Order = {
    product_id: _req.body.product_id,
    quantity: _req.body.quantity,
    user_id: _req.body.user_id,
    status: 'active',
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyAuthToken, create);
};
export default orders_routes;
