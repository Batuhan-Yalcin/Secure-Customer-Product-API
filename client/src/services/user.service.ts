import api from './api';
import { User } from '../types';

class UserService {
  static async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  }

  static async makeAdmin(userId: number): Promise<void> {
    await api.patch(`/users/${userId}/role`, { role: 'ADMIN' });
  }

  static async getUser(userId: number): Promise<User> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }
}

export default UserService; 