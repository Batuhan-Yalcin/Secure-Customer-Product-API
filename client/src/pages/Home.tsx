import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import Icon from '../components/ui/Icon';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuthContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      transition: {
        type: 'spring',
        stiffness: 300
      }
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

  return (
    <div className="min-h-[80vh] relative overflow-hidden flex flex-col items-center justify-center animated-background bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500 py-10 px-4">
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
    
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-10 text-white z-10"
      >
        Müşteri ve Ürün Yönetim Sistemi
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 z-10 max-w-7xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants} 
          whileHover="hover" 
          className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border-animated shadow-glow"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/30 p-3 rounded-full mr-4">
                <Icon name="FiUsers" className="text-4xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Müşteri Yönetimi</h3>
            </div>
            <p className="mb-6 text-gray-200">Tüm müşterilerinizi tek bir yerden yönetin. Müşteri detaylarını güncelleyin ve ürün bilgilerini ekleyin.</p>
            <Link 
              to="/customers" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Müşterileri Görüntüle
            </Link>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          whileHover="hover" 
          className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border-animated shadow-glow"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-500/30 p-3 rounded-full mr-4">
                <Icon name="FiUserPlus" className="text-4xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Müşteri Kayıt</h3>
            </div>
            <p className="mb-6 text-gray-200">Yeni müşteriler ekleyin ve ürün bilgilerini kaydedin. Müşteri bazlı ürün portföyü oluşturun.</p>
            <Link 
              to="/customers/new" 
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Yeni Müşteri Ekle
            </Link>
          </div>
        </motion.div>

        {isAuthenticated && isAdmin() && (
          <motion.div 
            variants={itemVariants}
            whileHover="hover" 
            className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border-animated shadow-glow"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500/30 p-3 rounded-full mr-4">
                  <Icon name="FiActivity" className="text-4xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Admin Paneli</h3>
              </div>
              <p className="mb-6 text-gray-200">Yönetici olarak sistem ayarlarını yapın, kullanıcı rollerini güncelleyin ve daha fazlasını yapın.</p>
              <Link 
                to="/admin" 
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Admin Paneline Git
              </Link>
            </div>
          </motion.div>
        )}

        {!isAuthenticated && (
          <motion.div 
            variants={itemVariants}
            whileHover="hover" 
            className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border-animated shadow-glow"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-500/30 p-3 rounded-full mr-4">
                  <Icon name="FiLogIn" className="text-4xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Hesap İşlemleri</h3>
              </div>
              <p className="mb-6 text-gray-200">Sisteme giriş yapın veya yeni bir hesap oluşturun. Hesabınızla müşteri işlemlerini yönetin.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Giriş Yap
                </Link>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Home; 