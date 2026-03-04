import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ChevronRight } from '@/assets';
import { UserPanelOrderCard, UserPanelSidebar, UserPanelStatCard } from '@/components';
import { useUserPanelData } from '@/core/hooks';
import { useSession } from '@/core/store/session';
import type { UserPanelTab } from '@/core/types';

import './UserProfile.css';

export const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useSession();
  const { greeting, subtitle, menu, stats, orders, profile } = useUserPanelData();
  const [activeTab, setActiveTab] = useState<UserPanelTab>('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                <button type="button" className="user-profile__view-all">
                  <Typography component="span" sx={{ fontSize: '20px', color: 'inherit' }}>
                    View All
                  </Typography>
                  <ChevronRight width={18} height={18} />
                </button>
              </div>

              <div className="user-profile__orders-list">
                {orders.map((order) => (
                  <UserPanelOrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
