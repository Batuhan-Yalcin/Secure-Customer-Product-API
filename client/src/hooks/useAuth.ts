import { useState, useEffect, useCallback } from 'react';
import { User, AuthRequest } from '../types';
import AuthService from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(AuthService.getStoredUser());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());

  // Kullanıcı bilgilerini güncelle
  const refreshUser = useCallback(async () => {
    if (AuthService.isAuthenticated()) {
      setLoading(true);
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);
      } catch (err) {
        console.error("Kullanıcı bilgileri alınamadı:", err);
        setError('Kullanıcı bilgileri alınamadı');
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Component mount olduğunda kullanıcı bilgilerini getir
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Login işlemi
  const login = async (authRequest: AuthRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Auth servisi üzerinden login işlemi yap
      const response = await AuthService.login(authRequest);
      
      // Otomatik olarak kullanıcı bilgilerini güncelle
      await refreshUser();
      return true;
    } catch (err: any) {
      // Hata mesajını ayıkla
      const errorMessage = err.response?.data?.message || 'Giriş başarısız';
      console.error('Login error:', err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register işlemi
  const register = async (authRequest: AuthRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Auth servisi üzerinden kayıt işlemi yap
      await AuthService.register(authRequest);
      return true;
    } catch (err: any) {
      // Hata mesajını ayıkla
      const errorMessage = err.response?.data?.message || 'Kayıt başarısız';
      console.error('Register error:', err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout işlemi
  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Admin kontrolü
  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    isAdmin
  };
}; 