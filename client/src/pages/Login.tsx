import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import Icon from '../components/ui/Icon';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
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
  const backgrounds = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 30) + 10,
    width: Math.floor(Math.random() * 30) + 10,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    delay: Math.random() * 5
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!username.trim() || !password) {
      setErrorMessage('Lütfen kullanıcı adı ve şifre giriniz');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const success = await login(username, password);
      
      if (success) {
        navigate('/');
      } else {
        setErrorMessage('Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Giriş sırasında bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center animated-background bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
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
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 10 + bg.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-lg z-10 border-animated shadow-glow"
      >
        {/* Animasyonlu kenar çizgileri için span elementleri */}
        <span></span>
        <span></span>
        
        <motion.div variants={itemVariants}>
          <div className="text-center">
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            >
              <Icon name="FiLayers" className="h-12 w-12 text-white" />
            </motion.div>
            <motion.h2 
              className="mt-6 text-center text-3xl font-extrabold text-white"
              variants={itemVariants}
            >
              Hesabınıza Giriş Yapın
            </motion.h2>
            <motion.p 
              className="mt-2 text-center text-sm text-gray-200"
              variants={itemVariants}
            >
              Veya{' '}
              <Link to="/register" className="font-medium text-indigo-200 hover:text-white transition-colors">
                yeni bir hesap oluşturun
              </Link>
            </motion.p>
          </div>
        </motion.div>
        
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 p-4 rounded-md flex items-center text-red-100 border border-red-700/50"
          >
            <Icon name="FiAlertCircle" className="h-5 w-5 mr-3" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
        
        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <motion.div variants={itemVariants}>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">Kullanıcı Adı</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="FiUser" className="h-5 w-5 text-indigo-200" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 bg-white/10 border border-indigo-300/30 rounded-md placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/70 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                  placeholder="Kullanıcı Adı"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Şifre</label>
                <Link to="#" className="text-sm text-indigo-200 hover:text-white transition-colors">
                  Şifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="FiLock" className="h-5 w-5 text-indigo-200" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 pl-10 bg-white/10 border border-indigo-300/30 rounded-md placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/70 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                  placeholder="Şifre"
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Icon name="FiLogIn" className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
              </span>
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Giriş Yapılıyor...
                </span>
              ) : 'Giriş Yap'}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login; 