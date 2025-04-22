import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/ui/Icon';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center bg-white p-10 rounded-xl shadow-lg"
      >
        <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Sayfa Bulunamadı</h1>
        <p className="text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link to="/" className="btn btn-primary flex items-center justify-center max-w-xs mx-auto">
          <Icon name="FiArrowLeft" className="mr-2" /> Ana Sayfaya Dön
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound; 