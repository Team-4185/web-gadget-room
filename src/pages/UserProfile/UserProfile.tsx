import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { ChevronRight } from '@/assets';
import {
  ProductCard,
  CircularProgress,
  UserPanelOrderCard,
  UserPanelSettings,
  UserPanelSidebar,
  UserPanelStatCard,
} from '@/components';
import { USER_PANEL_FAVORITE_PRODUCTS } from '@/core/constants';
import { useUserOrders, useUserPanelData } from '@/core/hooks';
import { useAppSelector } from '@/core/store';
import type { UpdateUserProfilePayload, UserPanelTab } from '@/core/types';

import './UserProfile.css';

export const UserProfile = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const [profileInfo, setProfileInfo] = useState<UpdateUserProfilePayload>({
    firstName: '',
    lastName: '',
    city: '',
    phoneNumber: '',
  });
  const { orders, totalElements, loading: ordersLoading, error: ordersError } = useUserOrders(0, 10);
  const { greeting, subtitle, menu, stats, profile } = useUserPanelData(
    profileInfo,
    totalElements
  );
  const [activeTab, setActiveTab] = useState<UserPanelTab>('overview');

  const handleLogout = () => {
    navigate('/login');
  };

  const recentOrders = orders.slice(0, 2);
  const isOverviewTab = activeTab === 'overview';
  const isOrdersTab = activeTab === 'orders';
  const isFavoriteTab = activeTab === 'favorite';
  const isSettingsTab = activeTab === 'settings';

  return (
    <section className="user-profile" aria-label="User Profile Page">
      <Container disableGutters>
        <div className="user-profile__layout">
          <UserPanelSidebar
            fullName={profile.fullName}
            email={profile.email}
            menu={menu}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />

          <div className="user-profile__content">
            {isOverviewTab && (
              <>
                <div className="user-profile__hero">
                  <Typography
                    component="h2"
                    sx={{
                      marginBottom: '4px',
                      fontSize: '24px',
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {greeting}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      margin: 0,
                      fontSize: '14px',
                    }}
                  >
                    {subtitle}
                  </Typography>
                </div>

                <div className="user-profile__stats" aria-label="Account overview">
                  {stats.map((item) => (
                    <UserPanelStatCard key={item.id} item={item} />
                  ))}
                </div>

                <div className="user-profile__orders" aria-label="Recent Orders">
                  <div className="user-profile__orders-header">
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Recent Orders
                    </Typography>
                    <button
                      type="button"
                      className="user-profile__view-all"
                      onClick={() => setActiveTab('orders')}
                    >
                      <Typography component="span" sx={{ fontSize: '20px', color: 'inherit' }}>
                        View All
                      </Typography>
                      <ChevronRight width={18} height={18} />
                    </button>
                  </div>

                  <div className="user-profile__orders-list">
                    {ordersLoading ? <CircularProgress /> : null}
                    {!ordersLoading && ordersError ? (
                      <Typography component="p">{ordersError}</Typography>
                    ) : null}
                    {!ordersLoading && !ordersError && !recentOrders.length ? (
                      <Typography component="p">No recent orders yet.</Typography>
                    ) : null}
                    {!ordersLoading &&
                      !ordersError &&
                      recentOrders.map((order) => (
                        <UserPanelOrderCard key={order.id} order={order} />
                      ))}
                  </div>
                </div>
              </>
            )}

            {isOrdersTab && (
              <div className="user-profile__orders" aria-label="My Orders">
                <div className="user-profile__orders-header">
                  <Typography
                    component="h2"
                    sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}
                  >
                    My Orders
                  </Typography>
                </div>

                <div className="user-profile__orders-list">
                  {ordersLoading ? <CircularProgress /> : null}
                  {!ordersLoading && ordersError ? (
                    <Typography component="p">{ordersError}</Typography>
                  ) : null}
                  {!ordersLoading && !ordersError && !orders.length ? (
                    <Typography component="p">No orders yet.</Typography>
                  ) : null}
                  {!ordersLoading &&
                    !ordersError &&
                    orders.map((order) => <UserPanelOrderCard key={order.id} order={order} />)}
                </div>
              </div>
            )}

            {isFavoriteTab && (
              <div className="user-profile__orders" aria-label="My Favorites">
                <div className="user-profile__orders-header">
                  <Typography
                    component="h2"
                    sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}
                  >
                    My Favorites
                  </Typography>
                </div>

                <div className="user-profile__favorites-grid">
                  {USER_PANEL_FAVORITE_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {isSettingsTab && (
              <UserPanelSettings
                userId={userId}
                email={profile.email}
                profile={profileInfo}
                onProfileSaved={setProfileInfo}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
