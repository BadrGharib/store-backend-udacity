import { User, UserStore } from '../model/users';
import bcrypt from 'bcrypt';

const store = new UserStore();

describe('users Model', () => {
  let user: User;
  beforeAll(async () => {
    user = await store.create({
      firstname: 'badr',
      lastname: 'gharib',
      password: 'password_123',
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

  it('create method should add a user with hashed password', async () => {
    expect(
      bcrypt.compareSync('password_123' + process.env.PEPPER, user.password)
    ).toBe(true);
    expect(user.firstname).toEqual('badr');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct user', async () => {
    const user = await store.show('1');
    expect(user.firstname).toEqual('badr');
  });
});
