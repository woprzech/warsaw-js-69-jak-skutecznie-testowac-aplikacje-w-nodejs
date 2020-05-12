import * as express from 'express';
import * as bodyParser from 'body-parser';
import {MongoDBUsersRepository} from "./users.repository";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(
  bodyParser.json()
);

app.post('/api/users', async (req, res) => {
  await new MongoDBUsersRepository().save(req.body);
  res.sendStatus(200);
});

app.get('/api/users', async (req, res) => {
  const users = await new MongoDBUsersRepository().findAll();
  res.json(users);
});

export default app;
