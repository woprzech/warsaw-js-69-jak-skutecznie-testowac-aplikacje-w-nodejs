import {MongoMemoryServer} from 'mongodb-memory-server';
import * as mongoose from "mongoose";
import * as supertest from "supertest";
import app from "./users.controller";
import {User} from "./users.repository";

describe('test', () => {
  let mongoServer: MongoMemoryServer;
  beforeEach(async () => {
    mongoServer = await new MongoMemoryServer({
      instance: {
        dbName: 'test'
      },
      binary: {
        version: '4.0.13'
      }
    });
    const connectionString = await mongoServer.getUri();
    await mongoose.connect(connectionString);
  }, 60000);

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('add user', async () => {
    await saveUser({name: 'Piotr Kowalski'});

    const users = await fetchUsers();

    expect(users).toHaveLength(1);
    expect(users).toContainEqual(expect.objectContaining({name: 'Piotr Kowalski'}));
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
