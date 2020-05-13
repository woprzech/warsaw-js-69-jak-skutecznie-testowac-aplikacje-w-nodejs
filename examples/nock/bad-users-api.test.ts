import * as supertest from "supertest";
import axios from "axios";
import app from "./users.controller";
import {User} from "../mongodb/users.repository";
import Mock = jest.Mock;

jest.mock('axios', () => ({
  default: ({
    post: jest.fn(),
    get: jest.fn()
  })
}));

describe('test', () => {
  beforeEach(async () => {
  }, 60000);

  afterEach(async () => {
  });

  it('add user', async () => {
    (axios.post as Mock).mockImplementation(() => Promise.resolve());
    (axios.get as Mock).mockImplementation(() => Promise.resolve([{name: 'Jan Kowalski'}]));
    await saveUser({name: 'Jan Kowalski'});

    const users = await fetchUsers();

    expect(users).toHaveLength(1);
    expect(users).toContainEqual(expect.objectContaining({name: 'Jan Kowalski'}));
  });

  async function fetchUsers() {
    const response = await supertest(app)
      .get('/api/users')
      .expect(200);
    return response.body;
  }

  async function saveUser(user: User) {
    await supertest(app)
      .post('/api/users')
      .send(user)
      .expect(200);
  }
});
