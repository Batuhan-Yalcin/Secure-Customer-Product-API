import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import Icon from '../ui/Icon';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center">
                <Icon name="FiLayers" className="h-8 w-8 text-primary mr-2" />
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Müşteri Yönetimi</span>
              </Link>
            </motion.div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors flex items-center"
              >
                <Icon name="FiHome" className="inline mr-2" /> Ana Sayfa
              </Link>
              
              {isAuthenticated && (
                <Link
                  to="/customers"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors flex items-center"
                >
                  <Icon name="FiUsers" className="inline mr-2" /> Müşteriler
                </Link>
              )}
              
              {isAuthenticated && isAdmin() && (
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors flex items-center"
                >
                  <Icon name="FiUser" className="inline mr-2" /> Admin Paneli
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Merhaba, <span className="font-semibold">{user?.username}</span></span>
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="FiLogOut" className="inline mr-2" /> Çıkış
                </motion.button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <motion.button
              type="button"
              className="p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen 
                ? <Icon name="FiX" className="h-6 w-6" />
                : <Icon name="FiMenu" className="h-6 w-6" />
              }
            </motion.button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="sm:hidden bg-white border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white transition-colors"
                onClick={toggleMenu}
              >
                <Icon name="FiHome" className="inline mr-2" /> Ana Sayfa
              </Link>
              
              {isAuthenticated && (
                <Link
                  to="/customers"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  <Icon name="FiUsers" className="inline mr-2" /> Müşteriler
                </Link>
              )}
              
              {isAuthenticated && isAdmin() && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  <Icon name="FiUser" className="inline mr-2" /> Admin Paneli
                </Link>
              )}
            </div>
            
            <div className="px-2 py-3 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-base font-medium text-gray-600">
                    Merhaba, <span className="font-semibold">{user?.username}</span>
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon name="FiLogOut" className="inline mr-2" /> Çıkış
                  </motion.button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-center text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={toggleMenu}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-center bg-primary text-white hover:bg-primary-dark transition-colors"
                    onClick={toggleMenu}
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 