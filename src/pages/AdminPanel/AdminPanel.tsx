import { useState } from 'react';
import { Container, Typography } from '@mui/material';

import {
  AdminCustomersTab,
  AdminDashboardTab,
  AdminProductModal,
  AdminOrdersTab,
  AdminPanelSidebar,
  AdminProductsTab,
} from '@/components';
import { ADMIN_PRODUCT_FIELD_TOOLTIPS } from '@/core/constants';
import {
  useAdminCustomersData,
  useAdminOrdersData,
  useAdminPanelData,
  useAdminProductModal,
  useAdminProductManagementData,
} from '@/core/hooks';
import type { AdminPanelTab } from '@/core/types';

import './AdminPanel.css';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminPanelTab>('dashboard');

  const { greeting, subtitle, menu, stats, brands, topProducts, recentOrders, lowStock } =
    useAdminPanelData();
  const {
    products,
    availableBrands,
    totalProducts,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    isLoading: isProductsLoading,
    searchQuery,
    selectedBrand,
    selectedStatus,
    goToPreviousPage,
    goToNextPage,
    onSearchChange,
    onBrandChange,
    onStatusChange,
    refreshProducts,
  } = useAdminProductManagementData();
  const dashboardProductModal = useAdminProductModal({ onRefreshProducts: refreshProducts });
  const {
    kpis: ordersKpis,
    orders,
    totalOrders,
    currentPage: ordersCurrentPage,
    totalPages: ordersTotalPages,
    isFirstPage: isOrdersFirstPage,
    isLastPage: isOrdersLastPage,
    isLoading: isOrdersLoading,
    activeFilter: ordersActiveFilter,
    onFilterChange: onOrdersFilterChange,
    goToPreviousPage: goToPreviousOrdersPage,
    goToNextPage: goToNextOrdersPage,
  } = useAdminOrdersData();
  const {
    kpis: customersKpis,
    customers,
    totalCustomers,
    currentPage: customersCurrentPage,
    totalPages: customersTotalPages,
    isFirstPage: isCustomersFirstPage,
    isLastPage: isCustomersLastPage,
    isLoadingCustomers,
    searchQuery: customersSearchQuery,
    onSearchChange: onCustomersSearchChange,
    goToPreviousCustomerPage,
    goToNextCustomerPage,
  } = useAdminCustomersData();

  const isDashboardTab = activeTab === 'dashboard';
  const isProductTab = activeTab === 'product';
  const isOrdersTab = activeTab === 'orders';
  const isCustomersTab = activeTab === 'customers';

  return (
    <section className="admin-panel" aria-label="Admin panel page">
      <Container disableGutters>
        <div className="admin-panel__layout">
          <AdminPanelSidebar menu={menu} activeItem={activeTab} onTabChange={setActiveTab} />

          <div className="admin-panel__content">
            <div className="admin-panel__hero">
              <Typography component="h1" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
                {greeting}
              </Typography>
              <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
                {subtitle}
              </Typography>
            </div>

            {isDashboardTab && (
              <AdminDashboardTab
                stats={stats}
                brands={brands}
                topProducts={topProducts}
                recentOrders={recentOrders}
                lowStock={lowStock}
                onTabChange={setActiveTab}
                onAddProduct={dashboardProductModal.openAddModal}
              />
            )}
            {isProductTab && (
              <AdminProductsTab
                products={products}
                availableBrands={availableBrands}
                totalProducts={totalProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                isLoading={isProductsLoading}
                searchQuery={searchQuery}
                selectedBrand={selectedBrand}
                selectedStatus={selectedStatus}
                onPreviousPage={goToPreviousPage}
                onNextPage={goToNextPage}
                onSearchChange={onSearchChange}
                onBrandChange={onBrandChange}
                onStatusChange={onStatusChange}
                onRefreshProducts={refreshProducts}
              />
            )}
            {isOrdersTab && (
              <AdminOrdersTab
                kpis={ordersKpis}
                orders={orders}
                totalOrders={totalOrders}
                currentPage={ordersCurrentPage}
                totalPages={ordersTotalPages}
                isFirstPage={isOrdersFirstPage}
                isLastPage={isOrdersLastPage}
                isLoading={isOrdersLoading}
                activeFilter={ordersActiveFilter}
                onFilterChange={onOrdersFilterChange}
                onPreviousPage={goToPreviousOrdersPage}
                onNextPage={goToNextOrdersPage}
              />
            )}
            {isCustomersTab && (
              <AdminCustomersTab
                kpis={customersKpis}
                customers={customers}
                searchQuery={customersSearchQuery}
                currentPage={customersCurrentPage}
                totalCustomers={totalCustomers}
                totalPages={customersTotalPages}
                isFirstPage={isCustomersFirstPage}
                isLastPage={isCustomersLastPage}
                isLoadingCustomers={isLoadingCustomers}
                onSearchChange={onCustomersSearchChange}
                onPreviousPage={goToPreviousCustomerPage}
                onNextPage={goToNextCustomerPage}
              />
            )}
          </div>
        </div>
      </Container>

      <AdminProductModal
        isOpen={dashboardProductModal.isProductModalOpen}
        title="Add a new product"
        submitLabel="Save"
        values={dashboardProductModal.draftProduct}
        activeTab={dashboardProductModal.activeTab}
        imageName={dashboardProductModal.imageName}
        uploadLabel="Upload an image"
        editDescriptionLabel="Description"
        fieldErrors={dashboardProductModal.fieldErrors}
        fieldTooltips={ADMIN_PRODUCT_FIELD_TOOLTIPS}
        onClose={dashboardProductModal.closeProductModal}
        onSave={() => void dashboardProductModal.saveProductModal()}
        onTabChange={dashboardProductModal.setActiveTab}
        onValueChange={dashboardProductModal.handleDraftChange}
        variantErrors={dashboardProductModal.variantErrors}
        onVariantChange={dashboardProductModal.handleVariantChange}
        onAddVariant={dashboardProductModal.addVariant}
        onRemoveDraftVariant={dashboardProductModal.removeDraftVariant}
        onRequestDeleteVariant={dashboardProductModal.requestDeleteVariant}
        onImageChange={dashboardProductModal.handleImageChange}
      />
    </section>
  );
};
