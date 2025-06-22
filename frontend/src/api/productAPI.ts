import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProduct = async (product: FormData) => {
  const res = await axios.post(`${API_URL}`, product, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
export const updateProduct = async (id: number, formData: FormData) => {
  await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
