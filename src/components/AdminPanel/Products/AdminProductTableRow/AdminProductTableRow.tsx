import { Typography } from '@mui/material';

import { Edit, Trash, Visibility } from '@/assets';
import { ADMIN_PRODUCT_STATUS_LABELS } from '@/core/constants';
import type { IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductTableRow.css';

interface IProps {
  product: IAdminPanelManagedProduct;
  onEdit: (product: IAdminPanelManagedProduct) => void;
  onDelete: (product: IAdminPanelManagedProduct) => void;
}

export const AdminProductTableRow = ({ product, onEdit, onDelete }: IProps) => (
  <tr>
    <td className="admin-product-table-row__product-cell">
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
      <span className={`admin-product-table-row__status is-${product.status}`}>
        {ADMIN_PRODUCT_STATUS_LABELS[product.status]}
      </span>
    </td>
    <td>
      <div className="admin-product-table-row__actions">
        <button type="button" aria-label={`View ${product.title}`}>
          <Visibility />
        </button>
        <button type="button" aria-label={`Edit ${product.title}`} onClick={() => onEdit(product)}>
          <Edit />
        </button>
        <button
          type="button"
          aria-label={`Delete ${product.title}`}
          onClick={() => onDelete(product)}
        >
          <Trash />
        </button>
      </div>
    </td>
  </tr>
);
