import client from '../database';

export type Order = {
  id?: string | number;
  product_id: string | number;
  quantity: number;
  user_id: string | number;
  status: 'active' | 'complete';
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'select * from orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders. Error: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (product_id,quantity,user_id,status) values ($1,$2,$3,$4) returning *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.product_id,
        order.quantity,
        order.user_id,
        order.status,
      ]);
      const newOrder = result.rows[0];
      conn.release();
      return newOrder;
    } catch (error) {
      throw new Error(
        `Could not add new order for user ${order.user_id} and prodct ${order.product_id}. Error: ${error}`
      );
    }
  }
}
