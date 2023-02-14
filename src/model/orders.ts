import client from '../database';

export type Order = {
  id?: number;
  user_id: number | string;
  status: 'active' | 'complete';
};
export type Order_product = {
  id?: number;
  order_id: number | string;
  product_id: number | string;
  quantity: number;
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
  async show(id: number): Promise<Order> {
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
        'INSERT INTO orders (user_id,status) values ($1,$2) returning *';
      const conn = await client.connect();
      const result = await conn.query(sql, [order.user_id, order.status]);
      const newOrder = result.rows[0];
      conn.release();
      return newOrder;
    } catch (error) {
      throw new Error(
        `Could not add new order for user ${order.user_id}. Error: ${error}`
      );
    }
  }
  async add_product_to_order(
    orderProduct: Order_product
  ): Promise<Order_product> {
    try {
      const conn = await client.connect();
      const sqlOrder = 'select * from orders where id=($1)';
      const orderResult = await conn.query(sqlOrder, [orderProduct.order_id]);
      if (orderResult.rows.length === 0) {
        throw new Error(`Can't add product to not exist order`);
      }
      if (orderResult.rows[0]?.status === 'complete') {
        throw new Error(`Can't Add product to completed order`);
      }
      const sql =
        'INSERT INTO orders_products (order_id,product_id,quantity) values ($1,$2,$3) returning *';
      const result = await conn.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity,
      ]);
      const newProductToOrder = result.rows[0];
      conn.release();
      return newProductToOrder;
    } catch (error) {
      throw new Error(
        `Could not add product ${orderProduct.product_id} to  order ${orderProduct.order_id}. Error: ${error}`
      );
    }
  }
}
