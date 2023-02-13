import express, { Request, Response } from 'express';
import { DashboardStore } from '../services/dashboard';
import { verifyAuthToken } from '../services/verification';

const store = new DashboardStore();
const currentOrderByUser = async (_req: Request, res: Response) => {
  try {
    const userId = _req.params.id;
    const order = await store.current_order_by_user(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboard_routes = (app: express.Application) => {
  app.get('/current_order_by_user/:id', verifyAuthToken, currentOrderByUser);
};
export default dashboard_routes;
