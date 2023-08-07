import Api from './api';

interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

export default class UsersService extends Api {
  constructor() {
    super()
  }

  async create({ email, password, name }: UserCredentials) {
    const login = await this.api.post('/users', { email, password, name });
  
    return login.data;
  }
}

