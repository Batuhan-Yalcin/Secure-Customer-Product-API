import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiArrowLeft, FiAlertCircle, FiPackage, FiUser, FiCalendar, FiShoppingBag } from 'react-icons/fi';
import CustomerService from '../services/customer.service';
import { Customer } from '../types';
import Icon from '../components/ui/Icon';

interface CustomerDetailProps {
  customerId?: number;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId: propCustomerId }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const id = propCustomerId || Number(paramId);
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Animasyon varyantları
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
    if (id) {
      fetchCustomer(id);
    } else {
      setError('Müşteri ID bilgisi eksik');
      setLoading(false);
    }
  }, [id]);

  const fetchCustomer = async (customerId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await CustomerService.getCustomerById(customerId);
      setCustomer(data);
    } catch (error: any) {
      setError('Müşteri bilgileri yüklenirken bir hata oluştu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!customer?.id) return;

    try {
      await CustomerService.deleteCustomer(customer.id);
      navigate('/customers');
    } catch (error: any) {
      setError('Müşteri silinirken bir hata oluştu');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] relative overflow-hidden animated-background bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500 flex items-center justify-center">
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
        
        <div className="container mx-auto px-4 py-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 p-4 rounded-md flex items-center text-red-100 border border-red-700/50 mb-6"
          >
            <Icon name="FiAlertCircle" className="h-5 w-5 mr-3" />
            <span>{error}</span>
          </motion.div>
          <Link to="/customers" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300">
            <Icon name="FiArrowLeft" className="mr-2" /> Müşteri Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-[80vh] relative overflow-hidden animated-background bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500 flex items-center justify-center">
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
        
        <div className="container mx-auto px-4 py-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-900/30 p-4 rounded-md flex items-center text-yellow-100 border border-yellow-700/50 mb-6"
          >
            <Icon name="FiAlertCircle" className="h-5 w-5 mr-3" />
            <span>Müşteri bulunamadı</span>
          </motion.div>
          <Link to="/customers" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300">
            <Icon name="FiArrowLeft" className="mr-2" /> Müşteri Listesine Dön
          </Link>
        </div>
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
        <div className="flex justify-between items-center mb-6">
          <Link to="/customers" className="flex items-center text-white hover:text-indigo-200 transition-colors">
            <Icon name="FiArrowLeft" className="mr-1" /> Müşteriler
          </Link>
          <div className="flex gap-2">
            <Link
              to={`/customers/edit/${customer.id}`}
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors duration-300"
            >
              <Icon name="FiEdit2" className="mr-2" /> Düzenle
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              <Icon name="FiTrash2" className="mr-2" /> Sil
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border-animated shadow-glow"
        >
          <div className="p-6 border-b border-indigo-200/20">
            <h1 className="text-2xl font-bold text-white">{customer.firstName} {customer.lastName}</h1>
            <p className="text-indigo-200">Sipariş: {customer.orderName}</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-white flex items-center">
                <Icon name="FiUser" className="mr-2" /> Müşteri Bilgileri
              </h2>
              <div className="space-y-2 text-indigo-100">
                <p>
                  <span className="font-medium">Ad Soyad:</span> {customer.firstName} {customer.lastName}
                </p>
                <p>
                  <span className="font-medium">Yaş:</span> {customer.age}
                </p>
                <p>
                  <span className="font-medium">Sipariş:</span> {customer.orderName}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-indigo-200/20">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-white">
              <Icon name="FiPackage" className="mr-2" /> Ürünler ({customer.product.length})
            </h2>
            {customer.product.length === 0 ? (
              <p className="text-indigo-200">Bu müşteri için ürün bulunmamaktadır.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customer.product.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-indigo-900/30 p-4 rounded-md hover:bg-indigo-800/40 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white flex items-center">
                        <Icon name="FiShoppingBag" className="mr-2 text-indigo-300" /> {product.name}
                      </h3>
                      <span className="font-bold text-white bg-green-800/50 px-3 py-1 rounded-full text-sm">
                        {product.price.toLocaleString('tr-TR', {
                          style: 'currency',
                          currency: 'TRY'
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

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
                <span className="font-semibold">{customer?.firstName} {customer?.lastName}</span> isimli müşteriyi 
                silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-indigo-900/50 text-white rounded-md hover:bg-indigo-800"
                >
                  İptal
                </button>
                <button
                  onClick={handleDelete}
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

export default CustomerDetail; 