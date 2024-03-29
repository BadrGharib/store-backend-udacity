import express, { Request, Response } from 'express';
import { Order, OrderStore, Order_product } from '../model/orders';
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
    const order = await store.show(req.params.id as unknown as number);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (_req: Request, res: Response) => {
  const order: Order = {
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
const add_product_to_order = async (_req: Request, res: Response) => {
  try {
    const orderProduct: Order_product = {
      order_id: _req.body.order_id,
      product_id: _req.body.product_id,
      quantity: _req.body.quantity,
    };
    const newProductAddedToOrder = await store.add_product_to_order(
      orderProduct
    );
    res.json(newProductAddedToOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.post('/add_product_to_order', verifyAuthToken, add_product_to_order);
};
export default orders_routes;
