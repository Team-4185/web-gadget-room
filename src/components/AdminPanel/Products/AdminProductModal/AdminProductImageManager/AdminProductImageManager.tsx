import { type ChangeEvent } from 'react';

import type { IAdminProductModalImage } from '@/core/types';

import './AdminProductImageManager.css';

interface IProps {
  imageName: string;
  uploadLabel?: string;
  images?: IAdminProductModalImage[];
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: (imageId: number) => void;
}

export const AdminProductImageManager = ({
  imageName,
  uploadLabel,
  images,
  onImageChange,
  onImageDelete,
}: IProps) => (
  <div className="admin-product-image-manager">
    {images && (
      <div className="admin-product-image-manager__images">
        <div className="admin-product-image-manager__image-list">
          <span>Current images</span>
          {images.length ? (
            images.map((image) => (
              <div key={image.id} className="admin-product-image-manager__image-item">
                <img src={image.src} alt={image.name} />
                <button
                  type="button"
                  aria-label={`Delete ${image.name}`}
                  onClick={() => onImageDelete?.(image.id)}
                >
                  x
                </button>
              </div>
            ))
          ) : (
            <p>No images yet</p>
          )}
        </div>
      </div>
    )}

    <label className="admin-product-image-manager__upload">
      <input type="file" accept="image/*" onChange={onImageChange} />
      <div className="admin-product-image-manager__upload-inner">
        <span>{uploadLabel}</span>
        <span className="admin-product-image-manager__upload-plus">+</span>
        <p>{imageName || 'Click or drop an image here'}</p>
      </div>
    </label>
  </div>
);
