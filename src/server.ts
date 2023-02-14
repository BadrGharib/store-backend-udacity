import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';

dotenv.config();
const app: express.Application = express();
const port = process.env.PORT;
const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200, //some lagacy browser
};
app.use(cors(corsOption));
app.use(bodyParser.json());
usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);
dashboardRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`starting app on: localhost:${port}`);
});
export default app;
