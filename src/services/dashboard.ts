import client from '../database';
import { Order } from '../model/orders';

export class DashboardStore {
  async current_order_by_user(userId: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'select * from orders where user_id=($1) and status=($2)';
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
