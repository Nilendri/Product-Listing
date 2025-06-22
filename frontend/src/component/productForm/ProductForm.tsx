import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { Product } from '../../types/product';
import '../Products.css';
import './productForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface ProductFormProps {
  onCreate: (formData: FormData) => void;
  onUpdate: (id: number, formData: FormData) => void;
  editingProduct: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onCreate,
  onUpdate,
  editingProduct,
}) => {
  const [images, setImages] = useState<(string | File)[]>([]);

  useEffect(() => {
    if (editingProduct) {
      const existing = editingProduct.images.map((img) => img.url);
      setImages(existing);
    }
  }, [editingProduct]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const existingImages: string[] = [];
    images.forEach((img) => {
      if (typeof img === 'string') {
        existingImages.push(img);
      } else {
        formData.append('images', img);
      }
    });
    formData.append('existingImages', JSON.stringify(existingImages));
    if (editingProduct) {
      onUpdate(editingProduct.id!, formData);
    } else {
      onCreate(formData);
    }
  };

  return (
    <form id='form' onSubmit={handleSubmit} className='product-create-update'>
      <h1>{editingProduct ? 'Update' : 'Add'} product</h1>

      <div className='first-row'>
        <input
          name='sku'
          type='text'
          placeholder='SKU'
          required
          defaultValue={editingProduct?.sku}
        />
        <input
          name='name'
          type='text'
          placeholder='Name'
          required
          defaultValue={editingProduct?.name}
        />
      </div>

      <input
        name='price'
        type='number'
        placeholder='Price'
        required
        defaultValue={editingProduct?.price}
      />

      <h3>Product Images</h3>

      <div className='image-preview-wrapper'>
        {images?.map((img, index) => (
          <div key={index} className='image-preview'>
            {typeof img === 'string' ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${img.replace(
                  /^\/+/,
                  ''
                )}`}
                alt={`img-${index}`}
              />
            ) : (
              <img src={URL.createObjectURL(img)} alt={`new-img-${index}`} />
            )}
            <button type='button' onClick={() => removeImage(index)}>
              ❌
            </button>
          </div>
        ))}
      </div>

      <label className='image-upload'>
        <input type='file' multiple onChange={handleImageUpload} hidden />
        <div className='upload-box'>
          <i className='fa-solid fa-upload'></i> Add Image
        </div>
      </label>

      <div className='button-wrapper'>
        <button type='submit' className='submit'>
          {editingProduct ? 'Update' : 'Create'} Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
