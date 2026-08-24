/* ========================================
   StatsCard Component
   ========================================
   Demonstrates: Props (title, value, variant), reusable component
   Used in both Citizen and Municipal Dashboards
   ======================================== */

function StatsCard({ title, value, variant = '' }) {
  let className = 'stats-card';
  if (variant) {
    className = className + ' ' + variant;
  }

  return (
    <div className={className}>
      <div className="stats-card-value">{value}</div>
      <div className="stats-card-label">{title}</div>
    </div>
  );
}

export default StatsCard;
