import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: express.Application = express();
const address: string = '0.0.0.0:3001';
const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200, //some lagacy browser
};
app.use(cors(corsOption));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3001, function () {
  console.log(`starting app on: ${address}`);
});
