import * as express from 'express';
import * as bodyParser from 'body-parser';
import {userRepository} from "./users.repository";

const app = express();

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
  await userRepository.save(req.body);
  res.sendStatus(200);
});

export default app;
