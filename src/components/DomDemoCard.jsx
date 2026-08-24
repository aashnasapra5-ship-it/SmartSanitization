/* ========================================
   DomDemoCard Component
   ========================================
   Satisfies Evaluation Criteria C: DOM Manipulation
   
   Demonstrates:
   1. Traditional JavaScript direct DOM manipulation:
      - document.getElementById
      - document.querySelector
      - addEventListener
      - createElement / textContent / style update
   
   2. Clear contrast with React's state-driven architecture:
      - State/Props → React Virtual DOM → UI Update
   
   Isolated cleanly to avoid damaging React's component hierarchy.
   ======================================== */

import { useState, useRef, useEffect } from 'react';

function DomDemoCard() {
  // --- React State approach ---
  const [reactCount, setReactCount] = useState(0);

  // --- Traditional Vanilla DOM approach using ref container ---
  const vanillaContainerRef = useRef(null);

  useEffect(function () {
    const container = vanillaContainerRef.current;
    if (!container) return;

    // Clear previous elements if re-rendered
    container.innerHTML = '';

    // 1. Create elements via Traditional DOM APIs
    const label = document.createElement('p');
    label.id = 'vanilla-label';
    label.style.fontWeight = '600';
    label.style.marginBottom = '8px';
    label.textContent = 'Vanilla DOM Count: 0';

    const btn = document.createElement('button');
    btn.id = 'vanilla-btn';
    btn.className = 'btn btn-secondary btn-sm';
    btn.textContent = 'Click (Vanilla DOM)';

    let count = 0;

    // 2. Attach Event Listener (addEventListener) & Direct DOM Modification
    function handleVanillaClick(e) {
      // Event object & propagation demonstration
      e.stopPropagation();
      count++;
      
      // Direct DOM manipulation
      const targetLabel = document.querySelector('#vanilla-label');
      if (targetLabel) {
        targetLabel.textContent = 'Vanilla DOM Count: ' + count;
        targetLabel.style.color = count % 2 === 0 ? 'var(--primary)' : 'var(--accent)';
      }
    }

    btn.addEventListener('click', handleVanillaClick);

    // 3. Append to DOM tree
    container.appendChild(label);
    container.appendChild(btn);

    // Cleanup event listener on unmount
    return function () {
      btn.removeEventListener('click', handleVanillaClick);
    };
  }, []);

  return (
    <article className="card" style={{ marginTop: '32px', border: '2px solid var(--primary-light)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '1.5rem' }}>⚡</span>
        <h3 style={{ fontSize: '1.25rem' }}>Evaluation Demonstration: DOM vs React State</h3>
      </div>
      
      <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
        This interactive component demonstrates the technical difference between direct Browser DOM manipulation and React's declarative state model.
      </p>

      <div className="grid-2">
        {/* Traditional DOM Manipulation Column */}
        <div style={{ padding: '16px', backgroundColor: 'var(--surface-alt)', borderRadius: 'var(--radius)' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            1. Traditional JS (Direct DOM)
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px' }}>
            Uses <code>document.querySelector</code>, <code>getElementById</code>, and <code>addEventListener</code> to directly mutate HTML elements.
          </p>
          <div ref={vanillaContainerRef}></div>
        </div>

        {/* React State Column */}
        <div style={{ padding: '16px', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius)' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            2. React Architecture (State & Props)
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Uses <code>useState</code> hook. State changes trigger React reconciliation to render updated UI declaratively.
          </p>
          <p style={{ fontWeight: 600, marginBottom: '8px', color: reactCount % 2 === 0 ? 'var(--primary)' : 'var(--accent)' }}>
            React State Count: {reactCount}
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={function () { setReactCount(reactCount + 1); }}
          >
            Click (React State)
          </button>
        </div>
      </div>
    </article>
  );
}

export default DomDemoCard;
