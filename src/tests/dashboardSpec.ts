import { Order, OrderStore } from '../model/orders';
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
  beforeAll(async () => {
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
      product_id: user.id as string,
      quantity: 2,
      status: 'active',
      user_id: product.id as string,
    });
  });
  it('should have an current_order_by_user method', () => {
    expect(dashboardStore.current_order_by_user).toBeDefined();
  });

  it('current_order_by_user method should return current active order for specific user', async () => {
    const currentOrder = await dashboardStore.current_order_by_user(
      user.id as string
    );
    expect(currentOrder).toEqual({
      id: 1,
      product_id: (product.id as number)?.toString(),
      quantity: 2,
      status: 'active',
      user_id: (user.id as number)?.toString(),
    });
  });
});
