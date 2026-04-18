import { useMemo, useState, type ChangeEvent, type FC } from 'react';
import { Typography } from '@mui/material';

import type { AdminProductStatus, IAdminPanelManagedProduct, ISelectOption } from '@/core/types';
import { Button, Search, Select } from '@/components/ui';
import { Edit, Plus, Trash, Visibility } from '@/assets';
import {
  AdminProductModal,
  type IAdminProductFormState,
} from '@/components/AdminPanel/Products/AdminProductModal/AdminProductModal';

import './AdminProductManagementTable.css';

interface IProps {
  products: IAdminPanelManagedProduct[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  searchQuery: string;
  selectedBrand: string;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSearchChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

const STATUS_LABELS = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  no_stock: 'No Stock',
} as const;

const STATUS_OPTIONS: ISelectOption[] = [
  { value: '', name: 'All statuses' },
  { value: 'in_stock', name: 'In Stock' },
  { value: 'low_stock', name: 'Low Stock' },
  { value: 'no_stock', name: 'No Stock' },
];

export const AdminProductManagementTable: FC<IProps> = ({
  products,
  totalProducts,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading,
  searchQuery,
  selectedBrand,
  onPreviousPage,
  onNextPage,
  onSearchChange,
  onBrandChange,
}) => {
  const initialDraft: IAdminProductFormState = {
    name: '',
    sku: '',
    brand: '',
    price: '',
    stock: '',
    releaseYear: '',
    cpu: '',
    coresNumber: '',
    screenSize: '',
    frontCamera: '',
    mainCamera: '',
    batteryCapacity: '',
    description: '',
  };

  const [selectedStatus, setSelectedStatus] = useState<AdminProductStatus | ''>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IAdminPanelManagedProduct | null>(null);
  const [imageName, setImageName] = useState('');
  const [draftProduct, setDraftProduct] = useState<IAdminProductFormState>(initialDraft);

  const brandOptions = useMemo<ISelectOption[]>(
    () => [
      { value: '', name: 'All brands' },
      ...Array.from(new Set(products.map((product) => product.brand))).map((brand) => ({
        value: brand.toLowerCase(),
        name: brand,
      })),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesStatus = !selectedStatus || product.status === selectedStatus;

      return matchesStatus;
    });
  }, [products, selectedStatus]);

  const handleDraftChange = (field: keyof IAdminProductFormState, value: string) => {
    setDraftProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageName(file?.name ?? '');
  };

  const getNumericPrice = (value: string) => {
    const parsed = Number(value.replace(/[^\d.,]/g, '').replace(/,/g, ''));
    return Number.isFinite(parsed) ? String(parsed) : '';
  };

  const getNumericStock = (value: string) => {
    const parsed = Number(value.replace(/[^\d]/g, ''));
    return Number.isFinite(parsed) ? String(parsed) : '';
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setDraftProduct(initialDraft);
    setImageName('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: IAdminPanelManagedProduct) => {
    setIsAddModalOpen(false);
    setEditingProduct(product);
    setDraftProduct({
      name: product.title,
      sku: product.sku,
      brand: product.brand,
      price: getNumericPrice(product.price),
      stock: getNumericStock(product.stock),
      releaseYear: '',
      cpu: '',
      coresNumber: '',
      screenSize: '',
      frontCamera: '',
      mainCamera: '',
      batteryCapacity: '',
      description: '',
    });
    setImageName('');
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
    setDraftProduct(initialDraft);
    setImageName('');
  };

  const saveAddModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
    setDraftProduct(initialDraft);
    setImageName('');
  };

  return (
    <section className="admin-product-management" aria-label="Product management">
      <div className="admin-product-management__header">
        <div>
          <Typography component="h2" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
            Product Management
          </Typography>
          <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
            All products in your store
          </Typography>
        </div>

        <Button
          maxWidth="141px"
          height="36px"
          border="none"
          borderRadius="12px"
          sx={{ fontSize: '15px', fontWeight: 500 }}
          onClick={openAddModal}
        >
          <div className="admin-product-management__add-product-icon" aria-hidden="true">
            <Plus color="currentColor" />
            Add Product
          </div>
        </Button>
      </div>

      <div className="admin-product-management__filters">
        <Search
          className="admin-product-management__search"
          ariaLabel="Search products"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search Products"
        />

        <Select
          data={brandOptions}
          maxWidth="100%"
          height="46px"
          color="var(--black)"
          fontSize="16px"
          selectPadding="12px"
          value={selectedBrand}
          styleVariant="subtleBorder"
          onChange={onBrandChange}
          placeholder="All brands"
        />

        <Select
          data={STATUS_OPTIONS}
          maxWidth="100%"
          height="46px"
          color="var(--black)"
          fontSize="16px"
          selectPadding="12px"
          value={selectedStatus}
          styleVariant="subtleBorder"
          onChange={(value) => setSelectedStatus(value as AdminProductStatus | '')}
          placeholder="All statuses"
        />
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
            {filteredProducts.map((product) => (
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
                      <Visibility />
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit ${product.title}`}
                      onClick={() => openEditModal(product)}
                    >
                      <Edit />
                    </button>
                    <button type="button" aria-label={`Delete ${product.title}`}>
                      <Trash />
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
          Showing <span>{filteredProducts.length}</span> of <span>{totalProducts}</span> products
          {` - Page ${currentPage} of ${totalPages}`}
        </Typography>
        <div className="admin-product-management__pager">
          <button type="button" onClick={onPreviousPage} disabled={isFirstPage || isLoading}>
            Back
          </button>
          <button
            type="button"
            className="is-primary"
            onClick={onNextPage}
            disabled={isLastPage || isLoading}
          >
            Next
          </button>
        </div>
      </div>

      <AdminProductModal
        isOpen={isAddModalOpen || Boolean(editingProduct)}
        title={editingProduct ? 'Edit product' : 'Add a new product'}
        submitLabel={editingProduct ? 'Save edit' : 'Save'}
        values={draftProduct}
        imageName={imageName}
        uploadLabel={editingProduct ? 'Edit an image' : 'Upload an image'}
        editDescriptionLabel={editingProduct ? 'Edit description' : 'Description'}
        onClose={closeAddModal}
        onSave={saveAddModal}
        onValueChange={handleDraftChange}
        onImageChange={handleImageChange}
      />
    </section>
  );
};
