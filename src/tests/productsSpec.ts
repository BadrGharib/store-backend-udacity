import { Product, ProductStore } from '../model/products';

const store = new ProductStore();

describe('Products Model', () => {
  let product: Product;
  beforeAll(async () => {
    try {
      product = await store.create({
        name: 'Product 1',
        price: 250,
        category: 'category 1',
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

  it('create method should add a product', async () => {
    expect(product.name).toEqual('Product 1');
  });

  it('index method should return a list of products', async () => {
    try {
      const result = await store.index();
      expect(result.length).toBeGreaterThan(0);
    } catch (err) {
      console.log('error :', err);
    }
  });

  it('show method should return the correct product', async () => {
    try {
      const newproduct = await store.show(product.id as number);
      expect(newproduct.name).toEqual('Product 1');
    } catch (err) {
      console.log('error :', err);
    }
  });
});
