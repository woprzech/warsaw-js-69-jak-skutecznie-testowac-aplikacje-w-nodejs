import * as supertest from "supertest";
import app from "./users.controller";
import {User, userRepository} from "./users.repository";
import Mock = jest.Mock;

jest.mock('./users.repository', () => ({
  userRepository: {
    save: jest.fn()
  }
}));

describe('mock', () => {

  it('add user', async () => {
    await saveUser({name: 'Piotr Kowalski'});

    expect((userRepository.save as Mock)).toHaveBeenCalledTimes(1);
    expect((userRepository.save as Mock)).toHaveBeenCalledWith({name: 'Piotr Kowalski'});
  });

  async function saveUser(user: User) {
    await supertest(app)
      .post('/api/users')
      .send(user)
      .expect(200);
  }
});
