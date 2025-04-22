import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import UserService from '../services/user.service';
import { User } from '../types';
import Icon from '../components/ui/Icon';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processingUserId, setProcessingUserId] = useState<number | null>(null);

  const { isAdmin } = useAuthContext();

  useEffect(() => {
    if (!isAdmin()) {
      setError('Bu sayfaya erişim yetkiniz yok');
      setLoading(false);
      return;
    }

    fetchUsers();
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      setError(error.message || 'Kullanıcılar yüklenirken bir hata oluştu');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (userId: number) => {
    try {
      setProcessingUserId(userId);
      setError(null);
      setSuccessMessage(null);
      
      await UserService.makeAdmin(userId);
      
      // Güncelleme sonrası kullanıcı listesini yenile
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, role: 'ADMIN' as const };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      setSuccessMessage('Kullanıcı yetkileri güncellendi');
      
      // 3 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'Kullanıcı yetkilendirme sırasında bir hata oluştu');
      console.error('Error making admin:', error);
    } finally {
      setProcessingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Paneli</h1>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 p-4 rounded-md flex items-center text-red-700 mb-6"
        >
          <Icon name="FiAlertCircle" className="h-5 w-5 mr-3" />
          <span>{error}</span>
        </motion.div>
      )}
      
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-4 rounded-md flex items-center text-green-700 mb-6"
        >
          <Icon name="FiCheckCircle" className="h-5 w-5 mr-3" />
          <span>{successMessage}</span>
        </motion.div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oluşturulma
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'ADMIN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role === 'ADMIN' ? 'Admin' : 'Kullanıcı'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {user.role !== 'ADMIN' && (
                      <button
                        onClick={() => makeAdmin(user.id)}
                        disabled={processingUserId === user.id}
                        className={`px-3 py-1 rounded-md text-white bg-primary hover:bg-primary-dark transition-colors flex items-center
                          ${processingUserId === user.id ? 'opacity-70 cursor-wait' : ''}
                        `}
                      >
                        <Icon name="FiUserCheck" className="mr-1" />
                        {processingUserId === user.id ? 'İşleniyor...' : 'Admin Yap'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin; 