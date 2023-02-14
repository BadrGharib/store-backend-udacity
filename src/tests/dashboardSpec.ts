import { Order, OrderStore, Order_product } from '../model/orders';
import { User, UserStore } from '../model/users';
import { Product, ProductStore } from '../model/products';
import { DashboardStore } from '../services/dashboard';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const dashboardStore = new DashboardStore();

describe('dashboard service', () => {
  let order: Order;
  let product: Product;
  let user: User;
  let orderProduct: Order_product;
  beforeAll(async () => {
    try {
      user = await userStore.create({
        firstname: 'badr',
        lastname: 'gharib',
        password: 'password_123',
      });
      product = await productStore.create({
        name: 'Product 1',
        price: 250,
        category: 'category 1',
      });
      order = await orderStore.create({
        status: 'active',
        user_id: user.id as number,
      });
      orderProduct = await orderStore.add_product_to_order({
        order_id: order.id as number,
        product_id: product.id as number,
        quantity: 2,
      });
    } catch (err) {
      console.log('error :', err);
    }
  });
  it('should have an current_order_by_user method', () => {
    expect(dashboardStore.current_order_by_user).toBeDefined();
  });

  it('current_order_by_user method should return current active order for specific user', async () => {
    try {
      const currentOrder = await dashboardStore.current_order_by_user(
        user.id as number
      );
      expect(currentOrder).toEqual({
        id: order.id as number,
        user_id: (user.id as number).toString(),
        status: 'active',
        product_id: (product.id as number).toString(),
        quantity: 2,
      });
    } catch (err) {
      console.log('error :', err);
    }
  });
});
