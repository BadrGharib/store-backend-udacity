CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id BIGINT REFERENCES users(id),
    status VARCHAR(100)
     );