import React from 'react';
import type { Product } from '../../types/product';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-backdrop'>
        <div className='modal'>
          <button onClick={onClose}>❌</button>
          <h2>Product Details</h2>
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {product.images?.map((img, i) => (
              <img
                style={{ objectFit: 'contain' }}
                key={i}
                src={`${import.meta.env.VITE_BACKEND_URL}${img.url}`}
                width={100}
                alt={`product-img-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
