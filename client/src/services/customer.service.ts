import api from './api';
import { Customer, CustomerInputUpdate } from '../types';

const CustomerService = {
  async getAllCustomers(): Promise<Customer[]> {
    try {
      console.log('Tüm müşterileri getirme isteği gönderiliyor');
      const response = await api.get<Customer[]>('/customer/list');
      console.log('Müşteri listesi alındı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Müşterileri getirme hatası:', error);
      throw error;
    }
  },

  async getCustomerById(id: number): Promise<Customer> {
    try {
      console.log(`Müşteri detayı getiriliyor, ID: ${id}`);
      const response = await api.get<Customer>(`/customer/id/${id}`);
      console.log('Müşteri detayı alındı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Müşteri detayı getirme hatası:', error);
      throw error;
    }
  },

  async createCustomer(customer: CustomerInputUpdate): Promise<Customer> {
    try {
      console.log('Müşteri oluşturma isteği gönderiliyor:', customer);
      const response = await api.post<Customer>('/customer/save', customer);
      console.log('Müşteri oluşturuldu:', response.data);
      return response.data;
    } catch (error) {
      console.error('Müşteri oluşturma hatası:', error);
      throw error;
    }
  },

  async updateCustomer(id: number, customer: CustomerInputUpdate): Promise<Customer> {
    try {
      console.log(`Müşteri güncelleme isteği gönderiliyor, ID: ${id}`, customer);
      const response = await api.put<Customer>(`/customer/update/${id}`, customer);
      console.log('Müşteri güncellendi:', response.data);
      return response.data;
    } catch (error) {
      console.error('Müşteri güncelleme hatası:', error);
      throw error;
    }
  },

  async deleteCustomer(id: number): Promise<string> {
    try {
      console.log(`Müşteri silme isteği gönderiliyor, ID: ${id}`);
      const response = await api.delete<string>(`/customer/delete/${id}`);
      console.log('Müşteri silindi');
      return response.data;
    } catch (error) {
      console.error('Müşteri silme hatası:', error);
      throw error;
    }
  }
};

export default CustomerService; 