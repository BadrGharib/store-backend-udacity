# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index :
  '/products' (get) ---> get all products
- Show :
  '/products/:id' (get) --> get product details using product id parameter
- Create [token required]
  '/products' (post) --> create new product
  body example={name: 'Product 1',price: 250,category: 'category 1'}

- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]:
  '/users' (get) --> get all user
- Show [token required]
  '/users/:id' (get) --> get user details using user id parameter
- Create N[token required]
  '/users' (post) --> create new user and return access token
  body example= {firstname: 'first',lastname: 'second',password: 'password123'}

#### Orders

- Index [token required]:
  '/orders' (get) ---> get all orders
- Show [token required] :
  '/orders/:id' (get) --> get order details using order id parameter
- Create [token required]
  '/orders' (post) --> create new order
  body example={ product_id: 1,quantity: 2,status: 'active',user_id: 1}

#### Dashboard

- Current Order by user (args: user id)[token required]
  '/current_order_by_user/:id' (get)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstname
- lastname
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
