import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, FiAlertCircle } from 'react-icons/fi';
import CustomerService from '../services/customer.service';
import { Customer } from '../types';
import Icon from '../components/ui/Icon';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  // Animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Arkaplan animasyonu için
  const backgrounds = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 30) + 10,
    width: Math.floor(Math.random() * 30) + 10,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    delay: Math.random() * 5
  }));

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Müşteri listesi getiriliyor');
      const data = await CustomerService.getAllCustomers();
      console.log('Müşteri listesi alındı:', data);
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error: any) {
      console.error('Müşteri listesi getirme hatası:', error);
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      'Müşteriler yüklenirken bir hata oluştu';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (customer: Customer) => {
    console.log('Silmek için seçilen müşteri:', customer);
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete?.id) return;

    try {
      console.log(`Müşteri siliniyor, ID: ${customerToDelete.id}`);
      await CustomerService.deleteCustomer(customerToDelete.id);
      console.log('Müşteri başarıyla silindi');
      setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    } catch (error: any) {
      console.error('Müşteri silme hatası:', error);
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      'Müşteri silinirken bir hata oluştu';
      setError(errorMsg);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] relative overflow-hidden animated-background bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500 py-8 px-4">
      {/* Animasyonlu arkaplan öğeleri */}
      {backgrounds.map(bg => (
        <motion.div
          key={bg.id}
          className="absolute rounded-full bg-white"
          initial={{ 
            width: `${bg.width}px`, 
            height: `${bg.height}px`, 
            left: `${bg.x}%`, 
            top: `${bg.y}%`, 
            opacity: 0.1 
          }}
          animate={{ 
            y: [0, -100, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ 
            duration: 10 + bg.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">Müşteri Listesi</h1>
          <Link 
            to="/customers/new" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            <Icon name="FiPlus" className="mr-2" /> Yeni Müşteri
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="relative">
            <Icon name="FiSearch" className="absolute left-3 top-3 text-indigo-200" />
            <input
              type="text"
              placeholder="Müşteri Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-indigo-300/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-indigo-200"
            />
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 p-4 rounded-md flex items-center text-red-100 border border-red-700/50 mb-6"
          >
            <Icon name="FiAlertCircle" className="h-5 w-5 mr-3" />
            <span>{error}</span>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg text-center border-animated shadow-glow"
          >
            <p className="text-white">Müşteri bulunamadı.</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-2 text-indigo-200 hover:text-white hover:underline focus:outline-none"
              >
                Aramayı temizle
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden border-animated shadow-glow"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200/20">
                <thead className="bg-indigo-900/30">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-100 uppercase tracking-wider">
                      Müşteri
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-100 uppercase tracking-wider">
                      Sipariş
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-100 uppercase tracking-wider">
                      Ürün Sayısı
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-100 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/20">
                  {filteredCustomers.map((customer) => (
                    <tr 
                      key={customer.id}
                      className="hover:bg-indigo-900/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {customer.firstName} {customer.lastName}
                            </div>
                            <div className="text-sm text-indigo-200">
                              {customer.age} yaşında
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{customer.orderName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/50 text-green-200">
                          {customer.product.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/customers/${customer.id}`}
                            className="text-indigo-200 hover:text-white p-2 hover:bg-indigo-800/50 rounded-full transition-colors"
                            title="Görüntüle"
                          >
                            <Icon name="FiEye" />
                          </Link>
                          <Link
                            to={`/customers/edit/${customer.id}`}
                            className="text-yellow-200 hover:text-white p-2 hover:bg-yellow-800/50 rounded-full transition-colors"
                            title="Düzenle"
                          >
                            <Icon name="FiEdit2" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(customer)}
                            className="text-red-200 hover:text-white p-2 hover:bg-red-800/50 rounded-full transition-colors"
                            title="Sil"
                          >
                            <Icon name="FiTrash2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Silme Onay Modalı */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 max-w-md w-full border-animated shadow-glow"
            >
              <h2 className="text-xl font-bold mb-4 text-white">Müşteriyi Sil</h2>
              <p className="mb-6 text-gray-200">
                <span className="font-semibold">{customerToDelete?.firstName} {customerToDelete?.lastName}</span> isimli müşteriyi 
                silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-indigo-900/50 text-white rounded-md hover:bg-indigo-800"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Sil
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList; 