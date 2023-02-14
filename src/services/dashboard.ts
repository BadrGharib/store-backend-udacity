import client from '../database';
import { Order } from '../model/orders';

export class DashboardStore {
  async current_order_by_user(userId: number): Promise<{
    id: number;
    user_id: number | string;
    status: string;
    product_id: number | string;
    quantity: number;
  }> {
    try {
      const conn = await client.connect();
      const sql = `select orders.id,orders.user_id,orders.status,orders_products.product_id,orders_products.quantity 
         from orders INNER JOIN orders_products ON orders.id = orders_products.order_id  
         where user_id=($1) and status=($2)`;

      const result = await conn.query(sql, [userId, 'active']);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find current order for user ${userId}. Error: ${err}`
      );
    }
  }
}
