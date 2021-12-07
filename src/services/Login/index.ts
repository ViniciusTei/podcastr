import Api from '../api';

interface UserCredentials {
  email: string;
  password: string;
}

export default class LoginService extends Api {
  constructor() {
    super()
  }

  async login({ email, password }: UserCredentials) {
    try {
      const login = await this.api.post('/login', { email, password });
  
      const { token, user } = login.data
  
      return { token, user };
    } catch (error) {
      return null
    }
  }
}

