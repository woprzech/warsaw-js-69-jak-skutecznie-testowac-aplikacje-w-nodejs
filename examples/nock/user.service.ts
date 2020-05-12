import axios from 'axios';

export interface User {
  name: string;
}


export class UserService {
  static save(user:User) {
    return axios.post('http://example.com/users', user);
  }

  findAll():Promise<User[]> {
    return axios.get('http://example.com/users');
  }
}
