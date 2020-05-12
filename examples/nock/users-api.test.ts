import * as supertest from "supertest";
import * as nock from "nock";
import app from "./users.controller";
import {User} from "../mongodb/users.repository";

describe('test', () => {
  beforeEach(async () => {
    nock('http://example.com')
      .get('/users')
      .reply(200, [{name : 'Piotr Kowalski'}]);

    nock('http://example.com')
      .post('/users')
      .reply(200);
  }, 60000);

  afterEach(async () => {
  });

  it('add user', async () => {
    await saveUser({name: 'Piotr Kowalski'});

    const users = await fetchUsers();

    expect(users).toHaveLength(1);
    expect(users).toContainEqual(expect.objectContaining({name: 'Piotr Kowalski'}));
    expect(nock.pendingMocks()).toHaveLength(0);
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
