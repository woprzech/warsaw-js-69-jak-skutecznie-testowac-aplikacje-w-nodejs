import * as express from 'express';
import * as bodyParser from 'body-parser';
import {userRepository} from "./users.repository";

const app = express();

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
  await userRepository.save(req.body);
  res.sendStatus(200);
});

app.get('/api/users', async (req, res) => {
  const users = await userRepository.findAll();
  res.json(users);
});

export default app;
