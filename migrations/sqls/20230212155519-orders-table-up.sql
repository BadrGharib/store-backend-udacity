CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    status VARCHAR(100) NOT NULL
     );