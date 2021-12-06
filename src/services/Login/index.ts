import { api } from '../api';

interface UserCredentials {
  email: string;
  password: string;
}

export default class LoginService {
  async login({ email, password }: UserCredentials) {
    try {
      const login = await api.post('/login', { email, password });
  
      const { token, user } = login.data
  
      return { token, user };
    } catch (error) {
      return null
    }
  }
}

