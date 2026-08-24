/* ========================================
   Home Page
   ========================================
   Route: /
   
   Demonstrates: JSX, semantic HTML (<main>, <section>, <article>),
   React Router Link, CSS Grid/Flexbox, responsive layout
   
   Sections: Hero, Problem, Solution, Statistics, DOM Demo
   ======================================== */

import { Link } from 'react-router-dom';
import DomDemoCard from '../components/DomDemoCard';

function Home() {
  return (
    <main>
      {/* --- Hero Section --- */}
      <section className="hero">
        <div className="container">
          <h1>
            Cleaner Cities. <span className="highlight">Smarter Reporting.</span>
          </h1>
          <p>
            Report garbage in your area and help municipal teams respond efficiently.
            SmartSanitization connects citizens, municipal officers, and sanitation employees
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
        </div>
      </section>

      {/* --- Problem Section --- */}
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
              <p>
                Citizens see garbage dumped in public areas but have no easy way to report it
                to the responsible authorities.
              </p>
            </article>

            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
              <h4>Delayed Collection</h4>
              <p>
                Without a proper tracking system, garbage collection is often delayed
                for days or even weeks.
              </p>
            </article>

            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔒</div>
              <h4>Lack of Transparency</h4>
              <p>
                Citizens have no visibility into whether their complaints are being addressed
                or which employee is responsible.
              </p>
            </article>

            <article className="card">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📊</div>
              <h4>No Tracking System</h4>
              <p>
                Municipal bodies lack a centralized system to track, assign, and verify
                garbage cleanup operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* --- Solution Section --- */}
      <section className="section" style={{ backgroundColor: 'var(--surface-alt)' }} id="solution">
        <div className="container">
          <div className="section-header">
            <h2>How SmartSanitization Works</h2>
            <p>A simple four-step workflow that connects citizens to municipal teams.</p>
          </div>

          <div className="grid-4">
            <article className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
              <h4>1. Report</h4>
              <p>
                Citizens report garbage by uploading an image, selecting the type,
                and providing the location.
              </p>
            </article>

            <article className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👤</div>
              <h4>2. Assign</h4>
              <p>
                Municipal officers review complaints and assign a sanitation employee
                and vehicle for cleanup.
              </p>
            </article>

            <article className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧹</div>
              <h4>3. Collect</h4>
              <p>
                The assigned employee visits the location, cleans up the garbage,
                and uploads an after-cleaning image.
              </p>
            </article>

            <article className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✅</div>
              <h4>4. Resolve</h4>
              <p>
                The complaint is marked as resolved. Citizens can verify
                the cleanup through the tracking system.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* --- Statistics Section --- */}
      <section className="section" id="stats">
        <div className="container">
          <div className="section-header">
            <h2>Making a Difference</h2>
            <p>Our platform helps cities stay clean and responsive.</p>
          </div>

          <div className="grid-4">
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                1,240+
              </div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Reports Received</p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>
                980+
              </div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Reports Resolved</p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--info)' }}>
                120+
              </div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Active Areas</p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)' }}>
                4.2 hrs
              </div>
              <p style={{ marginTop: '8px', fontWeight: 500 }}>Average Response</p>
            </div>
          </div>

          {/* Educational DOM Demonstration Card */}
          <DomDemoCard />
        </div>
      </section>
    </main>
  );
}

export default Home;
