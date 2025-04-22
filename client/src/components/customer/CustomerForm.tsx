import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSave, FiPlusCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';
import { Customer, CustomerInputUpdate, Product } from '../../types';
import CustomerService from '../../services/customer.service';
import classnames from 'classnames';
import { useForm, Controller } from "react-hook-form";
import Icon from '../ui/Icon';

interface CustomerFormProps {
  customer?: Customer;
  isEdit?: boolean;
  customerId?: number;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer: propCustomer, isEdit = false, customerId: propCustomerId }) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id: string }>();
  const customerId = propCustomerId || Number(paramId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | undefined>(propCustomer);
  
  const emptyProduct: Product = {
    name: '',
    price: 0
  };

  const [formData, setFormData] = useState<CustomerInputUpdate>({
    firstName: '',
    lastName: '',
    age: 0,
    orderName: '',
    product: [{ ...emptyProduct }]
  });

  useEffect(() => {
    if (isEdit && customerId && !propCustomer) {
      fetchCustomer(customerId);
    }
  }, [isEdit, customerId, propCustomer]);

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        age: customer.age,
        orderName: customer.orderName,
        product: customer.product.length > 0 ? customer.product : [{ ...emptyProduct }]
      });
    }
  }, [customer]);

  const fetchCustomer = async (id: number) => {
    try {
      setLoading(true);
      const data = await CustomerService.getCustomerById(id);
      setCustomer(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Müşteri bilgileri yüklenirken bir hata oluştu';
      setError(errorMsg);
      console.error('Müşteri getirme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Input değişikliği: ${name} = ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Ürün değişikliği: index=${index}, ${name} = ${value}`);
    
    setFormData((prev) => {
      const updatedProducts = [...prev.product];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [name]: name === 'price' ? parseInt(value) || 0 : value
      };
      return {
        ...prev,
        product: updatedProducts
      };
    });
  };

  const addProduct = () => {
    console.log('Yeni ürün ekleniyor');
    setFormData((prev) => ({
      ...prev,
      product: [...prev.product, { ...emptyProduct }]
    }));
  };

  const removeProduct = (index: number) => {
    if (formData.product.length <= 1) {
      setError('En az bir ürün olmalıdır');
      return;
    }
    
    console.log(`Ürün siliniyor: index=${index}`);
    setFormData((prev) => {
      const updatedProducts = [...prev.product];
      updatedProducts.splice(index, 1);
      return {
        ...prev,
        product: updatedProducts
      };
    });
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || formData.age <= 0 || !formData.orderName.trim()) {
      setError('Lütfen tüm müşteri bilgilerini doldurun');
      return false;
    }

    // Ürün doğrulama
    const invalidProduct = formData.product.some(p => !p.name.trim() || p.price <= 0);
    if (invalidProduct) {
      setError('Lütfen tüm ürün bilgilerini doğru şekilde doldurun');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log('Form gönderiliyor:', formData);
      
      if (isEdit && customerId) {
        await CustomerService.updateCustomer(customerId, formData);
        console.log('Müşteri güncellendi');
      } else {
        await CustomerService.createCustomer(formData);
        console.log('Yeni müşteri oluşturuldu');
      }
      
      navigate('/customers');
    } catch (error: any) {
      console.error('Form gönderme hatası:', error);
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      'Bir hata oluştu';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && !customer && loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto customer-form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6 border border-purple-200 relative"
      >
        <span className="absolute inset-0 z-0"></span>
        <span className="absolute inset-0 z-0"></span>
        
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 border-b pb-4 border-purple-200 relative z-10">
          {isEdit ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 p-4 rounded-md flex items-center text-red-700 mb-6 border border-red-200 relative z-10"
          >
            <Icon name="FiAlertCircle" className="h-5 w-5 mr-3" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label text-indigo-700">Ad</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-300 w-full relative z-10"
                placeholder="Müşteri Adı"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label text-indigo-700">Soyad</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-300 w-full relative z-10"
                placeholder="Müşteri Soyadı"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label text-indigo-700">Yaş</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-300 w-full relative z-10"
                placeholder="Yaş"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="orderName" className="form-label text-indigo-700">Sipariş Adı</label>
              <input
                type="text"
                id="orderName"
                name="orderName"
                value={formData.orderName}
                onChange={handleChange}
                className="form-input focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-300 w-full relative z-10"
                placeholder="Sipariş Adı"
                required
              />
            </div>
          </div>

          <div className="mt-8 relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-700">Ürünler</h3>
              <button
                type="button"
                onClick={addProduct}
                className="btn bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 flex items-center px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 relative z-10"
              >
                <Icon name="FiPlusCircle" className="mr-2" /> Ürün Ekle
              </button>
            </div>

            <AnimatePresence>
              {formData.product.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-5 rounded-lg mb-4 border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10"
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-medium text-indigo-700">Ürün #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors hover:bg-red-50 rounded-full relative z-10"
                      title="Ürünü Kaldır"
                    >
                      <Icon name="FiXCircle" className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label text-indigo-600">Ürün Adı</label>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, e)}
                        className="form-input focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-300 w-full relative z-10"
                        placeholder="Ürün Adı"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label text-indigo-600">Fiyat</label>
                      <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, e)}
                        className="form-input focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-300 w-full relative z-10"
                        placeholder="Fiyat"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <motion.button
              type="button"
              onClick={addProduct}
              className="flex items-center px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-all duration-300 relative z-10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon name="FiPlusCircle" className="h-4 w-4 mr-2" />
              Yeni Ürün Ekle
            </motion.button>
          </div>

          <div className="mt-8 flex justify-end space-x-4 relative z-10">
            <motion.button
              type="button"
              onClick={() => navigate('/customers')}
              className={classnames(
                "px-6 py-2 rounded-md text-sm font-medium",
                "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              İptal
            </motion.button>
            
            <motion.button
              type="submit"
              className={classnames(
                "px-6 py-2 rounded-md text-sm font-medium flex items-center",
                "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700",
                loading && "opacity-70 cursor-not-allowed"
              )}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="FiSave" className="h-4 w-4 mr-2" />
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerForm; 