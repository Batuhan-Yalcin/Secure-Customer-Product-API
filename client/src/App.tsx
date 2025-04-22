import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuthContext } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import CustomerList from './pages/CustomerList';
import CustomerForm from './components/customer/CustomerForm';
import CustomerDetail from './pages/CustomerDetail';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

// 404 sayfası
const NotFoundPage: React.FC = () => {
  return <NotFound />;
};

// Yetkisiz erişim sayfası
const UnauthorizedPage: React.FC = () => {
  return <Unauthorized />;
};

// Müşteri detay sayfası
const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <CustomerDetail customerId={Number(id)} />;
};

// Müşteri düzenleme sayfası
const CustomerEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <CustomerForm isEdit customerId={Number(id)} />;
};

// Yeni müşteri oluşturma sayfası
const CustomerNewPage: React.FC = () => {
  return <CustomerForm />;
};

// CSS düzeltmesi
const appStyles = `
  .customer-form input,
  .customer-form button,
  .customer-form select,
  .customer-form textarea {
    pointer-events: auto !important;
    position: relative;
    z-index: 100;
  }
  
  .customer-form .form-group {
    position: relative;
    z-index: 100;
  }
`;

// Ana uygulama bileşeni
const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuthContext();

  return (
    <div className="min-h-screen flex flex-col animated-background bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500">
      <Navbar />
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 container mx-auto max-w-7xl">
        <style>{appStyles}</style>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          
          {/* Korumalı rotalar */}
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/customers/new" 
            element={
              <ProtectedRoute>
                <CustomerNewPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/customers/:id" 
            element={
              <ProtectedRoute>
                <CustomerDetailPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/customers/edit/:id" 
            element={
              <ProtectedRoute>
                <CustomerEditPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-4 text-center">
        <p>&copy; 2023 Müşteri Yönetim Sistemi. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <style>{appStyles}</style>
        <Router>
          <AppContent />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
