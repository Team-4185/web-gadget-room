import type { FC } from 'react';
import {
  KeyboardArrowDownOutlined,
  SearchOutlined,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutlineOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

import type { IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductManagementTable.css';

interface IProps {
  products: IAdminPanelManagedProduct[];
  totalProducts: number;
}

const STATUS_LABELS = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
} as const;

export const AdminProductManagementTable: FC<IProps> = ({ products, totalProducts }) => {
  return (
    <section className="admin-product-management" aria-label="Product management">
      <div className="admin-product-management__header">
        <div>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, lineHeight: 1 }}>
            Product Management
          </Typography>
          <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
            All products in your store
          </Typography>
        </div>

        <button type="button" className="admin-product-management__add-button">
          <span>+</span>
          Add Product
        </button>
      </div>

      <div className="admin-product-management__filters">
        <label className="admin-product-management__search" aria-label="Search products">
          <SearchOutlined sx={{ fontSize: '20px', color: 'var(--black-opacity-65)' }} />
          <input type="text" placeholder="Search Products" />
        </label>

        <button type="button" className="admin-product-management__select">
          All categories
          <KeyboardArrowDownOutlined sx={{ fontSize: '20px' }} />
        </button>

        <button type="button" className="admin-product-management__select">
          All statuses
          <KeyboardArrowDownOutlined sx={{ fontSize: '20px' }} />
        </button>
      </div>

      <div className="admin-product-management__table-wrap">
        <table className="admin-product-management__table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="admin-product-management__product-cell">
                  <img src={product.image} alt={product.title} />
                  <Typography variant="subtitle2" component="span" sx={{ fontWeight: 600 }}>
                    {product.title}
                  </Typography>
                </td>
                <td>{product.sku}</td>
                <td>{product.brand}</td>
                <td className="is-strong">{product.price}</td>
                <td className="is-strong">{product.stock}</td>
                <td>
                  <span className={`admin-product-management__status is-${product.status}`}>
                    {STATUS_LABELS[product.status]}
                  </span>
                </td>
                <td>
                  <div className="admin-product-management__actions">
                    <button type="button" aria-label={`View ${product.title}`}>
                      <VisibilityOutlined sx={{ fontSize: '18px' }} />
                    </button>
                    <button type="button" aria-label={`Edit ${product.title}`}>
                      <EditOutlined sx={{ fontSize: '18px' }} />
                    </button>
                    <button type="button" aria-label={`Delete ${product.title}`}>
                      <DeleteOutlineOutlined sx={{ fontSize: '18px' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-product-management__footer">
        <Typography variant="body2" component="p">
          Showing <span>{products.length}</span> of <span>{totalProducts}</span> products
        </Typography>
        <div className="admin-product-management__pager">
          <button type="button">Back</button>
          <button type="button" className="is-primary">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
