import * as supertest from "supertest";
import app from "./users.controller";
import {MongoDBUsersRepository, User} from "./users.repository";
import Mock = jest.Mock;

jest.mock('../users.repository');

describe('mock', () => {
  let savedUsers = [];

  beforeEach(() => {
    (MongoDBUsersRepository as Mock).mockImplementation(() => {
      return {
        save: (user: User) => {
          savedUsers.push(user);
        },
        findAll: async () => {
          return savedUsers;
        },
      };
    });
  });

  afterEach(() => {
    (MongoDBUsersRepository as Mock).mockClear();
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
