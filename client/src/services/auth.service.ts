import api from './api';
import { AuthRequest, AuthResponse, User } from '../types';

const AuthService = {
  async login(authRequest: AuthRequest): Promise<AuthResponse> {
    try {
      console.log('Login isteği gönderiliyor:', authRequest);
      const response = await api.post<AuthResponse>('/authenticate', authRequest);
      console.log('Login yanıtı:', response.data);
      
      if (response.data && response.data.token) {
        // Token'ı localStorage'a kaydet
        localStorage.setItem('token', response.data.token);
        
        // Basit bir kullanıcı objesi oluştur (JWT'den çıkarılabilir)
        const userData = {
          id: 1, // Gerçek ID gelmediği için varsayılan değer
          username: authRequest.username,
          role: 'USER' as const // Varsayılan rol
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(authRequest: AuthRequest): Promise<User> {
    try {
      console.log('Register isteği gönderiliyor:', authRequest);
      const response = await api.post<User>('/register', authRequest);
      console.log('Register yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  getCurrentUser(): User | null {
    // Backend'de /user/me endpoint'i olmadığı için localStorage'dan al
    return this.getStoredUser();
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }
    return null;
  },

  isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'ADMIN';
  }
};

export default AuthService; 