/* ========================================
   StatusBadge Component
   ========================================
   Demonstrates: Props (status), reusable component,
   conditional className using helper function
   ======================================== */

import { getStatusClass } from '../utils/helpers';

function StatusBadge({ status }) {
  const statusClass = getStatusClass(status);

  return (
    <span className={'badge badge-' + statusClass}>
      {status}
    </span>
  );
}

export default StatusBadge;
