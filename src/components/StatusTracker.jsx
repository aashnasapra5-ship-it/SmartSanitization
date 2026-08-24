/* ========================================
   StatusTracker Component
   ========================================
   Demonstrates: Props (status), .map() with arrays,
   conditional rendering, reusable timeline UI
   
   Displays a vertical timeline showing complaint progress:
   Reported → Verified → Assigned → Cleaning → Resolved
   ======================================== */

function StatusTracker({ status }) {
  // Define the workflow steps in order
  const steps = [
    { key: 'Pending', label: 'Reported', description: 'Complaint submitted by citizen' },
    { key: 'Verified', label: 'Verified', description: 'Report verified by officer' },
    { key: 'Assigned', label: 'Assigned', description: 'Employee assigned for cleanup' },
    { key: 'Cleaning', label: 'Cleaning', description: 'Cleanup in progress' },
    { key: 'Resolved', label: 'Resolved', description: 'Cleanup completed successfully' },
  ];

  // Find the index of the current status
  const currentIndex = steps.findIndex(function (step) {
    return step.key === status;
  });

  return (
    <div className="status-tracker" role="list" aria-label="Complaint status timeline">
      {steps.map(function (step, index) {
        // Determine if this step is completed, current, or upcoming
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        // Build CSS class for the dot
        let dotClass = 'status-dot';
        if (isCompleted) {
          dotClass = dotClass + ' completed';
        } else if (isCurrent) {
          dotClass = dotClass + ' current';
        }

        // Build CSS class for the connecting line
        let lineClass = 'status-line';
        if (isCompleted) {
          lineClass = lineClass + ' completed';
        }

        return (
          <div className="status-step" key={step.key} role="listitem">
            <div className="status-step-indicator">
              <div className={dotClass}>
                {isCompleted ? '✓' : index + 1}
              </div>
              {/* Show connecting line for all steps except the last */}
              {index < steps.length - 1 && (
                <div className={lineClass}></div>
              )}
            </div>
            <div className="status-step-content">
              <h4 className={!isCompleted && !isCurrent ? 'dimmed' : ''}>
                {step.label}
              </h4>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatusTracker;
