import { Order, OrderStore } from '../model/orders';
import { User, UserStore } from '../model/users';
import { Product, ProductStore } from '../model/products';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('orders Model', () => {
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
    order = await store.create({
      product_id: user.id as string,
      quantity: 2,
      status: 'active',
      user_id: product.id as string,
    });
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a order', async () => {
    const { id, ...orderWithoutId } = order;
    expect(orderWithoutId).toEqual({
      product_id: (product.id as number)?.toString(),
      quantity: 2,
      status: 'active',
      user_id: (user.id as number)?.toString(),
    });
  });

  it('index method should return a list of order', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct order', async () => {
    const order = await store.show(user.id as string);
    const { id, ...orderWithoutId } = order;
    expect(orderWithoutId).toEqual({
      product_id: (product.id as number)?.toString(),
      quantity: 2,
      status: 'active',
      user_id: (user.id as number)?.toString(),
    });
  });
});
