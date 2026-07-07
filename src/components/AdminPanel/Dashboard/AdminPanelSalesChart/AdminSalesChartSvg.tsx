import {
  ADMIN_SALES_CHART,
  formatAdminChartRevenueTick,
  type IAdminSalesChartDot,
  type IAdminSalesChartModel,
} from '@/core/utils';

interface IAdminSalesChartSvgProps {
  chartModel: IAdminSalesChartModel;
  onDotEnter: (dot: IAdminSalesChartDot) => void;
  onMouseLeave: () => void;
}

export const AdminSalesChartSvg = ({
  chartModel,
  onDotEnter,
  onMouseLeave,
}: IAdminSalesChartSvgProps) => (
  <svg
    viewBox={`0 0 ${ADMIN_SALES_CHART.viewBoxWidth} ${ADMIN_SALES_CHART.viewBoxHeight}`}
    role="img"
    aria-label="Sales trend lines"
    onMouseLeave={onMouseLeave}
  >
    <g stroke="var(--blue-violet-opacity-22)" strokeWidth="1">
      {chartModel.yAxisLabels.map((line) => (
        <line
          key={line.id}
          x1={ADMIN_SALES_CHART.left}
          y1={line.y}
          x2={ADMIN_SALES_CHART.right}
          y2={line.y}
        />
      ))}
      {chartModel.xAxisLabels.map((line) => (
        <line
          key={line.id}
          x1={line.x}
          y1={ADMIN_SALES_CHART.top}
          x2={line.x}
          y2={ADMIN_SALES_CHART.bottom}
        />
      ))}
    </g>

    <g className="admin-panel-sales-chart__y-labels">
      {chartModel.yAxisLabels.map((line) => (
        <text
          key={`label-${line.id}`}
          x={ADMIN_SALES_CHART.left - 8}
          y={line.y + 4}
          textAnchor="end"
        >
          {formatAdminChartRevenueTick(line.value)}
        </text>
      ))}
    </g>

    <g className="admin-panel-sales-chart__x-labels-svg">
      {chartModel.xAxisLabels.map((label) => (
        <text
          key={`label-${label.id}`}
          x={label.x}
          y={ADMIN_SALES_CHART.bottom + 20}
          textAnchor="middle"
        >
          {label.value}
        </text>
      ))}
    </g>

    {chartModel.revenueLine ? (
      <polyline
        fill="none"
        stroke="var(--chart-revenue-line)"
        strokeWidth="2"
        points={chartModel.revenueLine}
      />
    ) : null}

    <g fill="var(--chart-revenue-point)" stroke="var(--chart-revenue-point)">
      {chartModel.revenueDots.map((dot) => (
        <circle
          key={dot.key}
          cx={dot.cx}
          cy={dot.cy}
          r="4"
          className="admin-panel-sales-chart__point"
          onMouseEnter={() => onDotEnter(dot)}
        />
      ))}
    </g>
  </svg>
);
