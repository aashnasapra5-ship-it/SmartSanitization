// FormInput Component

function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  error = '',
  helperText = '',
  disabled = false,
  autoComplete = 'off',
  min,
  max,
}) {
  const inputId = id || name;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name || id}
        type={type}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {error ? (
        <p id={`${inputId}-error`} className="form-error" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default FormInput;
