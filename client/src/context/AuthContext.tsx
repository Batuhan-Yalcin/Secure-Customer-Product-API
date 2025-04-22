import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthResponse } from '../types';
import AuthService from '../services/auth.service';

interface User {
  id: number;
  username: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: { username: string, password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Login işlemi başlatılıyor');
      const response = await AuthService.login({ username, password });
      
      if (response && response.token) {
        console.log('Login başarılı, token alındı');
        // Token alındıktan sonra kullanıcı bilgilerini güncelle
        const storedUser = AuthService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
          return true;
        }
      }
      console.log('Login işlemi başarısız');
      return false;
    } catch (error: any) {
      console.error('Login sırasında hata:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { username: string, password: string }): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Register işlemi başlatılıyor');
      // Auth servisi üzerinden kayıt işlemi yap
      const result = await AuthService.register(data);
      console.log('Register sonucu:', result);
      return true;
    } catch (error: any) {
      console.error('Register sırasında hata:', error);
      // Hata mesajını döndür
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logout yapılıyor');
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'ADMIN';
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 