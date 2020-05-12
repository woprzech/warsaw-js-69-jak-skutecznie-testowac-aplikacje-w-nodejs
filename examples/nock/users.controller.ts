import * as express from 'express';
import * as bodyParser from 'body-parser';
import {UserService} from "./user.service";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(
  bodyParser.json()
);

app.post('/api/users', async (req, res) => {
  await UserService.save(req.body);
  res.sendStatus(200);
});

app.get('/api/users', async (req, res) => {
  const users = await new UserService().findAll();
  res.json(users);
});

export default app;
