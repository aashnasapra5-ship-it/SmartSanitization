// ReportGarbage Page

import ComplaintForm from '../components/ComplaintForm';

function ReportGarbage() {
  return (
    <main className="page" style={{ backgroundColor: 'var(--surface-alt)', minHeight: '100vh' }}>
      {/* Page Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, #1e293b 100%)',
        padding: '48px 0 36px',
        color: 'white',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '40px', height: '40px', borderRadius: '10px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)', fontSize: '1.25rem',
            }}>📋</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Citizen Service Portal
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: 'white' }}>
            Report a Garbage Issue
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Help keep your city clean. Provide details about the garbage site, upload
            evidence, and submit — our municipal team will handle the rest.
          </p>
        </div>
      </div>

      {/* Process Stepper */}
      <div className="container" style={{ marginTop: '-20px', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0',
          backgroundColor: 'white',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          {[
            { num: '1', label: 'Upload Photo', active: true },
            { num: '2', label: 'Waste Details' },
            { num: '3', label: 'Location' },
            { num: '4', label: 'Submit' },
          ].map((step, i) => (
            <div key={step.num} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '16px 20px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              backgroundColor: step.active ? 'rgba(16, 185, 129, 0.06)' : 'transparent',
            }}>
              <span style={{
                width: '28px', height: '28px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700,
                backgroundColor: step.active ? 'var(--primary)' : '#e2e8f0',
                color: step.active ? 'white' : '#64748b',
                flexShrink: 0,
              }}>
                {step.num}
              </span>
              <span style={{
                fontSize: '0.85rem', fontWeight: step.active ? 700 : 500,
                color: step.active ? 'var(--dark)' : '#64748b',
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Area */}
      <div className="container" style={{ marginTop: '32px', paddingBottom: '64px' }}>
        <div className="report-grid">
          {/* Form */}
          <div>
            <ComplaintForm />
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Reporting Tips */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>💡</span> Reporting Tips
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', gap: '8px', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  Take a clear, well-lit photo showing the full extent of the garbage pile.
                </li>
                <li style={{ display: 'flex', gap: '8px', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  Include nearby landmarks so our team can locate the spot quickly.
                </li>
                <li style={{ display: 'flex', gap: '8px', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  Mention if the waste includes hazardous materials (chemicals, medical, etc.).
                </li>
                <li style={{ display: 'flex', gap: '8px', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  Use the map pin for precise GPS coordinates — it helps workers navigate directly.
                </li>
              </ul>
            </div>

            {/* Average Response */}
            <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Avg. Response Time
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#166534' }}>
                4.2 hours
              </div>
              <p style={{ fontSize: '0.82rem', color: '#4ade80', marginTop: '4px', fontWeight: 500 }}>
                Based on 1,240+ resolved reports
              </p>
            </div>

            {/* Helpline */}
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>📞</span> Need Help?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
                Our civic support helpdesk is available Mon–Sat, 8 AM – 8 PM.
              </p>
              <div style={{
                padding: '10px 14px', borderRadius: '8px',
                backgroundColor: 'var(--surface-alt)', fontSize: '0.9rem',
                fontWeight: 700, color: 'var(--dark)', textAlign: 'center',
              }}>
                1800-XXX-XXXX (Toll Free)
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default ReportGarbage;
