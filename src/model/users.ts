import client from '../database';
import bcrypt from 'bcrypt';
export type User = {
  id?: Number | string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'select * from users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can't get users : ${error}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname,lastname,password) values ($1,$2,$3) returning *';
      const conn = await client.connect();
      const hash = await bcrypt.hash(
        user.password + process.env.PEPPER,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash,
      ]);
      const newUser = result.rows[0];
      conn.release();
      return newUser;
    } catch (error) {
      throw new Error(
        `Could not add new user ${user.firstname} ${user.lastname}. Error: ${error}`
      );
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    const con = await client.connect();
    const sql = 'select password from users where name =($1)';
    const result = await con.query(sql, [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + process.env.PEPPER, user.password)) {
        return user;
      }
    }
    return null;
  }
}