import React from 'react';
import type { Product } from '../../types/product';
import '../Products.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface ProductListingProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
}

const ProductListing: React.FC<ProductListingProps> = ({
  products,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <table cellPadding={10} cellSpacing={0} className='full-width-table'>
      <thead>
        <tr className='heading'>
          <th>ID</th>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
              There is no product till now
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>
                <span
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '9999px',
                    padding: '4px 10px',
                    fontSize: '14px',
                    display: 'inline-block',
                    border: 'none',
                  }}>
                  {product.images?.length || 0}{' '}
                  {product.images?.length === 1 ? 'image' : 'images'}
                </span>
              </td>
              <td className='actions'>
                <i
                  className='fa-solid fa-eye'
                  onClick={() => onView(product)}></i>
                <i
                  className='fa-solid fa-pen-to-square'
                  onClick={() => onEdit(product)}></i>
                <i
                  className='fa-solid fa-trash'
                  onClick={() => onDelete(product.id!)}></i>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductListing;
