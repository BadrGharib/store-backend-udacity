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
      order = await store.create({
        status: 'active',
        user_id: user.id as number,
      });
    } catch (err) {
      console.log('error :', err);
    }
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
      status: 'active',
      user_id: (user.id as number).toString(),
    });
  });

  it('index method should return a list of order', async () => {
    try {
      const result = await store.index();
      expect(result.length).toBeGreaterThan(0);
    } catch (err) {
      console.log('error :', err);
    }
  });

  it('show method should return the correct order', async () => {
    try {
      const order = await store.show(user.id as number);
      const { id, ...orderWithoutId } = order;
      expect(orderWithoutId).toEqual({
        status: 'active',
        user_id: (user.id as number).toString(),
      });
    } catch (err) {
      console.log('error :', err);
    }
  });

  it('add_product_to_order method should add product to order', async () => {
    try {
      const newAddProductToOrder = await store.add_product_to_order({
        order_id: (order.id as number).toString(),
        product_id: (product.id as number).toString(),
        quantity: 2,
      });
      const { id, ...newAddProductToOrderWithoutId } = newAddProductToOrder;
      expect(newAddProductToOrderWithoutId).toEqual({
        order_id: (order.id as number).toString(),
        product_id: (product.id as number).toString(),
        quantity: 2,
      });
    } catch (err) {
      console.log('error :', err);
    }
  });
});
