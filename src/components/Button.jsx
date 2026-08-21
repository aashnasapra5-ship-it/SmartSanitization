/* ========================================
   Button Component
   ========================================
   Demonstrates: Props (variant, size, children, onClick, type),
   reusable component, JSX, conditional className
   ======================================== */

function Button({ children, variant = 'primary', size = '', onClick, type = 'button', disabled = false }) {
  // Build className from props
  let className = 'btn';

  if (variant === 'primary') {
    className = className + ' btn-primary';
  } else if (variant === 'secondary') {
    className = className + ' btn-secondary';
  } else if (variant === 'danger') {
    className = className + ' btn-danger';
  }

  if (size === 'sm') {
    className = className + ' btn-sm';
  } else if (size === 'lg') {
    className = className + ' btn-lg';
  }

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
