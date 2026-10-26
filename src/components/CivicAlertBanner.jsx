// CivicAlertBanner Component

import useAppStore from '../store/useAppStore';

function CivicAlertBanner() {
  const civicAlert = useAppStore((state) => state.civicAlert);
  const dismissCivicAlert = useAppStore((state) => state.dismissCivicAlert);

  if (!civicAlert || !civicAlert.visible) {
    return null;
  }

  const bgColors = {
    info: 'rgba(59, 130, 246, 0.08)',
    warning: 'rgba(245, 158, 11, 0.1)',
    alert: 'rgba(239, 68, 68, 0.1)',
  };

  const borderColors = {
    info: 'var(--info)',
    warning: 'var(--warning)',
    alert: 'var(--danger)',
  };

  return (
    <aside
      className="civic-alert-banner"
      role="status"
      aria-label="Civic announcement banner"
      style={{
        backgroundColor: bgColors[civicAlert.level] || bgColors.info,
        borderBottom: `1px solid ${borderColors[civicAlert.level] || borderColors.info}`,
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.875rem',
        color: 'var(--text-main)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.1rem' }}>📢</span>
        <span>{civicAlert.message}</span>
        <span
          style={{
            fontSize: '0.7rem',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          Zustand Store
        </span>
      </div>

      <button
        type="button"
        onClick={dismissCivicAlert}
        aria-label="Dismiss banner"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          padding: '4px 8px',
          borderRadius: '4px',
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </aside>
  );
}

export default CivicAlertBanner;
