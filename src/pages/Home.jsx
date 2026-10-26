// Home Page

import { Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';

function Home() {
  const { complaints } = useComplaints();

  const liveTotal = complaints.length;
  const livePending = complaints.filter((c) => c.status === 'Pending').length;
  const liveResolved = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>
            Cleaner Cities. <span className="highlight">Smarter Reporting.</span>
          </h1>
          <p>
            Report garbage in your area and help municipal teams respond efficiently.
            Smart Sanitization connects citizens, municipal officers, and sanitation employees
            in one transparent workflow.
          </p>
          <div className="hero-actions">
            <Link to="/report" className="btn btn-primary btn-lg">
              📋 Report Garbage
            </Link>
            <Link to="/track" className="btn btn-secondary btn-lg">
              🔍 Track Complaint
            </Link>
          </div>

          {/* Live Status Pill */}
          <div
            style={{
              marginTop: '40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: 'white',
              padding: '10px 24px',
              borderRadius: '9999px',
              boxShadow: 'var(--shadow)',
              fontSize: '0.875rem',
              color: 'var(--text-main)',
              border: '1px solid var(--border)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <strong>System Online</strong>
            </span>
            <span>{liveTotal} Reports</span>
            <span>•</span>
            <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{livePending} Pending</span>
            <span>•</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>{liveResolved} Resolved</span>
            <Link to="/citizen" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
              View Dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section" id="problem">
        <div className="container">
          <div className="section-header">
            <h2>The Problem We Are Solving</h2>
            <p>Cities face persistent garbage management challenges that affect public health and quality of life.</p>
          </div>

          <div className="grid-4">
            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚯</div>
              <h4>Unreported Garbage</h4>
              <p>Citizens see garbage dumped in public areas but have no easy way to report it to the responsible authorities.</p>
            </article>
            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
              <h4>Delayed Collection</h4>
              <p>Without a proper tracking system, garbage collection is often delayed for days or even weeks.</p>
            </article>
            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔒</div>
              <h4>Lack of Transparency</h4>
              <p>Citizens have no visibility into whether their complaints are being addressed or which employee is responsible.</p>
            </article>
            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📊</div>
              <h4>No Tracking System</h4>
              <p>Municipal bodies lack a centralized system to track, assign, and verify garbage cleanup operations.</p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ backgroundColor: 'var(--surface-alt)' }} id="solution">
        <div className="container">
          <div className="section-header">
            <h2>How Smart Sanitization Works</h2>
            <p>A simple four-step workflow that connects citizens to municipal teams.</p>
          </div>

          <div className="grid-4">
            {[
              { icon: '📋', step: '1', title: 'Report', desc: 'Citizens report garbage by uploading an image, selecting the type, and providing the location.' },
              { icon: '👤', step: '2', title: 'Assign', desc: 'Municipal officers review complaints and assign a sanitation employee and vehicle for cleanup.' },
              { icon: '🧹', step: '3', title: 'Collect', desc: 'The assigned employee visits the location, cleans up the garbage, and uploads an after-cleaning image.' },
              { icon: '✅', step: '4', title: 'Resolve', desc: 'The complaint is marked as resolved. Citizens can verify the cleanup through the tracking system.' },
            ].map((item) => (
              <article className="card" key={item.step} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.8rem',
                  fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', marginTop: '8px' }}>{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="section" id="stats">
        <div className="container">
          <div className="section-header">
            <h2>Making a Difference</h2>
            <p>Our platform helps cities stay clean and responsive.</p>
          </div>

          <div className="grid-4">
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>1,240+</div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Reports Received</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>980+</div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Reports Resolved</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--info)' }}>120+</div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Active Areas</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#6366f1' }}>4.2 hrs</div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Avg. Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners / CTA */}
      <section className="section" style={{ backgroundColor: 'var(--dark)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
            Join the Clean City Movement
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Smart Sanitization is trusted by municipal corporations, ward offices, and civic
            bodies across Indian cities. Whether you are a citizen, a sanitation worker, or a
            municipal officer — this platform is built for you.
          </p>

          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['BBMP Bangalore', 'PMC Pune', 'GMC Gurgaon', 'PCMC Pimpri-Chinchwad'].map((name) => (
              <div key={name} style={{
                padding: '10px 20px', borderRadius: '8px',
                border: '1px solid #334155', backgroundColor: 'rgba(255,255,255,0.05)',
                fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.5px',
              }}>
                {name}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/report" className="btn btn-primary btn-lg" style={{ boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}>
              📋 File a Complaint Now
            </Link>
            <Link
              to="/municipal"
              className="btn btn-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
              }}
            >
              🏛️ Municipal Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
