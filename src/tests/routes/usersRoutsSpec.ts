import request from './index';
import { User } from '../../model/users';

describe('test users routes :', () => {
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
        console.log('token routes', token);
        done();
      });
  });

  it('/users  --->get users', (done) => {
    request
      .get('/users')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it(' /users  --->add new user successfully and return 200 status', (done) => {
    expect(user.firstname).toEqual('badr');
    done();
  });

  it(' /users/:id   ---> get user with user id and return 200 status', (done) => {
    request
      .get(`/users/${user.id}`)
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body.firstname).toEqual('badr');
        done();
      });
  });
});
