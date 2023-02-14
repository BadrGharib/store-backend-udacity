import request from './index';
import { Order } from '../../model/orders';
import { User } from '../../model/users';
import { Product } from '../../model/products';

describe('test orders routes :', () => {
  let token: string;
  let order: Order;
  let user: User;
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
        user = res.body;
        token = `Bearer ${res.body.token}`;
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
        done();
      });
  });

  it('/orders   --->get orders', (done) => {
    request
      .get('/orders')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it('/orders   --->post add new order successfully and return 200 status', (done) => {
    request
      .post('/orders')
      .send({
        user_id: user.id,
      })
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        order = res.body;
        done();
      });
  });

  it(' /orders/:id   --->get order with producy id successfully', (done) => {
    request
      .get(`/orders/${order.id}`)
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).toEqual(order);
        done();
      });
  });

  it(' /add_product_to_order   --->post add order to product successfully', (done) => {
    request
      .post('/add_product_to_order')
      .set('Authorization', token)
      .send({
        order_id: order.id,
        product_id: product.id,
        quantity: 2,
      })
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});
