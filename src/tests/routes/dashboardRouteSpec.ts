import request from './index';
import { User } from '../../model/users';

describe('test dashboard routes :', () => {
  let token: string;
  let user: User;
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
        done();
      });
  });

  it('/current_order_by_user/:id   --->get current order by user successfully', (done) => {
    request
      .get(`/current_order_by_user/:${user.id}`)
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        done();
      });
  });
});
