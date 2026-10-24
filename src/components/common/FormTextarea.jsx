// FormTextarea Component

function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  error = '',
  rows = 4,
  maxLength,
  disabled = false,
}) {
  const inputId = id || name;

  return (
    <div className="form-group">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {label && (
          <label className="form-label" htmlFor={inputId}>
            {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
          </label>
        )}
        {maxLength && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={inputId}
        name={name || id}
        className={`form-textarea ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {error && (
        <p id={`${inputId}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormTextarea;
