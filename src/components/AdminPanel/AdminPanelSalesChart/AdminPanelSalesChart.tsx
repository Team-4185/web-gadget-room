import { Typography } from '@mui/material';

import './AdminPanelSalesChart.css';

const X_LABELS = ['1 Oct', '8 Oct', '15 Oct', '22 Oct', '29 Oct', '5 Nov', '12 Nov'];

export const AdminPanelSalesChart = () => {
  return (
    <section className="admin-panel-sales-chart" aria-label="Sales analytics chart">
      <div className="admin-panel-sales-chart__head">
        <div>
          <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
            Sales Analytics
          </Typography>
          <Typography component="p" sx={{ marginTop: '6px', fontSize: '14px' }}>
            Revenue and orders for the period
          </Typography>
        </div>
        <div className="admin-panel-sales-chart__filters">
          <button type="button" className="is-active">
            Week
          </button>
          <button type="button">Month</button>
          <button type="button">Year</button>
        </div>
      </div>

      <div className="admin-panel-sales-chart__graph">
        <svg viewBox="0 0 544 320" role="img" aria-label="Sales trend lines">
          <g stroke="rgba(119, 119, 191, 0.22)" strokeWidth="1">
            <line x1="42" y1="10" x2="42" y2="280" />
            <line x1="42" y1="64" x2="498" y2="64" />
            <line x1="42" y1="118" x2="498" y2="118" />
            <line x1="42" y1="172" x2="498" y2="172" />
            <line x1="42" y1="226" x2="498" y2="226" />
            <line x1="42" y1="280" x2="498" y2="280" />
          </g>
          <polyline
            fill="none"
            stroke="#6b6b6b"
            strokeWidth="2"
            points="42,235 120,232 196,104 260,100 325,111 388,102 468,188"
          />
          <polyline
            fill="none"
            stroke="#9f97f4"
            strokeWidth="2"
            points="42,250 120,240 196,190 260,170 325,162 388,210 468,215"
          />
          <g fill="#f5a7a0" stroke="#f5a7a0">
            <circle cx="196" cy="104" r="3" />
            <circle cx="260" cy="100" r="3" />
            <circle cx="325" cy="111" r="3" />
            <circle cx="388" cy="102" r="3" />
            <circle cx="468" cy="188" r="3" />
          </g>
          <g fill="#9f97f4" stroke="#9f97f4">
            <circle cx="42" cy="250" r="3" />
            <circle cx="120" cy="240" r="3" />
            <circle cx="196" cy="190" r="3" />
            <circle cx="260" cy="170" r="3" />
            <circle cx="325" cy="162" r="3" />
            <circle cx="388" cy="210" r="3" />
            <circle cx="468" cy="215" r="3" />
          </g>
        </svg>
      </div>

      <div className="admin-panel-sales-chart__x-labels">
        {X_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  );
};
