import { Container } from '@mui/material';

import {
  UserPanelSettings,
  UserPanelSidebar,
  UserProfileFavoritesTab,
  UserProfileOrdersTab,
  UserProfileOverviewTab,
} from '@/components';
import { useUserProfilePage } from '@/core/hooks';

import './UserProfile.css';

export const UserProfile = () => {
  const {
    activeTab,
    userId,
    profile,
    profileInfo,
    greeting,
    subtitle,
    menu,
    stats,
    orders,
    recentOrders,
    ordersLoading,
    ordersError,
    favorites,
    favoritesLoading,
    favoritesError,
    handleTabChange,
    handleLogout,
    setProfileInfo,
    setProfileEmail,
    openProduct,
  } = useUserProfilePage();

  return (
    <section className="user-profile" aria-label="User Profile Page">
      <Container disableGutters>
        <div className="user-profile__layout">
          <UserPanelSidebar
            fullName={profile.fullName}
            email={profile.email}
            menu={menu}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onLogout={handleLogout}
          />

          <div className="user-profile__content">
            {activeTab === 'overview' && (
              <UserProfileOverviewTab
                greeting={greeting}
                subtitle={subtitle}
                stats={stats}
                recentOrders={recentOrders}
                ordersLoading={ordersLoading}
                ordersError={ordersError}
                onViewAllOrders={() => handleTabChange('orders')}
              />
            )}

            {activeTab === 'orders' && (
              <UserProfileOrdersTab
                orders={orders}
                ordersLoading={ordersLoading}
                ordersError={ordersError}
              />
            )}

            {activeTab === 'favorite' && (
              <UserProfileFavoritesTab
                favorites={favorites}
                favoritesLoading={favoritesLoading}
                favoritesError={favoritesError}
                onProductClick={openProduct}
              />
            )}

            {activeTab === 'settings' && (
              <UserPanelSettings
                userId={userId}
                email={profile.email}
                profile={profileInfo}
                onProfileSaved={setProfileInfo}
                onEmailSaved={setProfileEmail}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
