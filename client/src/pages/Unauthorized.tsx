import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/ui/Icon';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center bg-white p-10 rounded-xl shadow-lg"
      >
        <div className="flex justify-center mb-6">
          <Icon name="FiAlertTriangle" className="text-yellow-500 text-8xl" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Yetkisiz Erişim</h1>
        <p className="text-gray-600 mb-8">
          Bu sayfayı görüntülemek için gerekli yetkiniz bulunmamaktadır. Lütfen giriş yapın veya farklı bir hesapla deneyin.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary flex items-center justify-center">
            <Icon name="FiArrowLeft" className="mr-2" /> Ana Sayfaya Dön
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized; 