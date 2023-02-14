import { User, UserStore } from '../model/users';
import bcrypt from 'bcrypt';

const store = new UserStore();

describe('users Model', () => {
  let user: User;
  beforeAll(async () => {
    try {
      user = await store.create({
        firstname: 'badr',
        lastname: 'gharib',
        password: 'password_123',
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

  it('create method should add a user with hashed password', async () => {
    expect(
      bcrypt.compareSync('password_123' + process.env.PEPPER, user.password)
    ).toBe(true);
    expect(user.firstname).toEqual('badr');
  });

  it('index method should return a list of users', async () => {
    try {
      const result = await store.index();
      expect(result.length).toBeGreaterThan(0);
    } catch (err) {
      console.log('error :', err);
    }
  });

  it('show method should return the correct user', async () => {
    try {
      const newuser = await store.show(user.id as number);
      expect(newuser.firstname).toEqual('badr');
    } catch (err) {
      console.log('error :', err);
    }
  });
});
