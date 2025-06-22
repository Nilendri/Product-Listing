import { useState, useEffect } from 'react';
import ProductListing from '../component/productListing/ProductListing';
import ProductForm from '../component/productForm/ProductForm';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productAPI';
import type { Product } from '../types/product';
import ProductModal from '../component/viewProduct/ProductModal';
import './ProductPage.css';
import { UiModal } from '../ui/UiModal/UiModal';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleCreate = async (formData: FormData) => {
    const newProduct = await createProduct(formData);
    setProducts((prev) => [...prev, newProduct]);
    setModalOpen(false);
  };

  const handleUpdate = async (id: number, formData: FormData) => {
    await updateProduct(id, formData);
    await fetchProducts().then((res) => {
      setModalOpen(false);
      setProducts(res);
    });
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className='page-container'>
      <div className='headline'>
        <h1>Products Management</h1>
        <button
          className='add-product'
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}>
          + Add Product
        </button>
      </div>
      <div>
        <div className='product-details'>
          <h2>Products ({products.length})</h2>
          <ProductListing
            products={products}
            onEdit={(product) => {
              setModalOpen(true);
              if (product.id) {
                const found = products.find((p) => p.id === product.id);
                setEditingProduct(found || null);
              }
            }}
            onDelete={handleDelete}
            onView={(product) => {
              setViewingProduct(product);
            }}
          />
        </div>

        {modalOpen && (
          <UiModal
            onClose={() => {
              setModalOpen(false);
            }}>
            <ProductForm
              editingProduct={editingProduct}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
            />
          </UiModal>
        )}
        {viewingProduct && (
          <ProductModal
            product={viewingProduct}
            onClose={() => setViewingProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
