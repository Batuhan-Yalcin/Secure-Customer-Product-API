import api from './api';
import { User } from '../types';

const AdminService = {
  async updateUserRole(userId: number): Promise<User> {
    const response = await api.put<User>(`/admin/users/${userId}/role`);
    return response.data;
  }
};

export default AdminService; 