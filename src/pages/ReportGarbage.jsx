/* ========================================
   Report Garbage Page
   ========================================
   Route: /report
   
   Demonstrates: Functional component, JSX,
   semantic HTML (<main>, <section>), component composition
   
   The actual form logic is in ComplaintForm component.
   ======================================== */

import ComplaintForm from '../components/ComplaintForm';

function ReportGarbage() {
  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <h1>📋 Report Garbage</h1>
          <p>
            Help keep your city clean. Report garbage in your area by filling out the form below.
            Upload an image, describe the problem, and provide the location.
          </p>
        </div>

        <section style={{ maxWidth: '700px' }}>
          <ComplaintForm />
        </section>
      </div>
    </main>
  );
}

export default ReportGarbage;
