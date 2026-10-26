// FormError Component

function FormError({ message, id }) {
  if (!message) return null;

  return (
    <p id={id} className="form-error" role="alert" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span>⚠️</span>
      <span>{message}</span>
    </p>
  );
}

export default FormError;
