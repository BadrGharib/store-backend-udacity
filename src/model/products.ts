import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'select * from products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can't get products ${error} `);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name,price,category) values ($1,$2,$3) returning *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const newUser = result.rows[0];
      conn.release();
      return newUser;
    } catch (error) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${error}`
      );
    }
  }
}
