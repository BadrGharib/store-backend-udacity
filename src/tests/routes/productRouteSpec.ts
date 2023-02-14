import request from './index';
import { Product } from '../../model/products';

describe('test products routes :', () => {
  let token: string;
  let product: Product;

  beforeAll((done) => {
    request
      .post('/users')
      .send({
        firstname: 'badr',
        lastname: 'gharib',
        password: 'pass_123',
      })
      .end((err, res) => {
        if (err) console.log(err);
        token = `Bearer ${res.body.token}`;
        done();
      });
  });

  it('/products  --->get products', (done) => {
    request
      .get('/products')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it(' /products  --->add new product successfully and return 200 status', (done) => {
    request
      .post('/products')
      .send({
        name: 'product1',
        price: 200,
        category: 'shoes',
      })
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        product = res.body;
        done();
      });
  });

  it(' /products/:id   --->get product with producy id', (done) => {
    request
      .get(`/products/${product.id}`)
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).toEqual(product);
        done();
      });
  });
});
