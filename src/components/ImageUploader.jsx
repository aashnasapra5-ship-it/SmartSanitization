// ImageUploader Component

import { useState } from 'react';

const MAX_FILE_SIZE_MB = 2.5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

function ImageUploader({ image, onImageChange, error }) {
  const [fileName, setFileName] = useState('');
  const [localError, setLocalError] = useState('');

  function handleFileSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setLocalError('');

    // 1. Validate file format
    if (!ALLOWED_TYPES.includes(file.type)) {
      setLocalError('Unsupported file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // 2. Validate file size (protection against browser memory & localStorage quotas)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setLocalError(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please choose a smaller photo.`);
      return;
    }

    // 3. Read image as Data URL
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      setFileName(file.name);
      onImageChange(dataUrl, file.name);
    };
    reader.onerror = function () {
      setLocalError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    onImageChange(null, '');
    setFileName('');
    setLocalError('');
  }

  const displayedError = error || localError;

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="garbage-image">
        Upload Garbage Photo <span style={{ color: 'var(--danger)' }}>*</span>
      </label>

      {/* Upload Zone */}
      {!image && (
        <label
          className={`image-uploader ${displayedError ? 'error-border' : ''}`}
          htmlFor="garbage-image"
          style={{
            cursor: 'pointer',
            border: displayedError ? '2px dashed var(--danger)' : '2px dashed #94a3b8',
            padding: '28px 20px',
            borderRadius: 'var(--radius)',
            textAlign: 'center',
            display: 'block',
            backgroundColor: '#f8fafc',
            transition: 'all 0.2s ease',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div className="upload-icon" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📷</div>
          <div className="upload-text" style={{ fontWeight: 700, color: 'var(--dark)', fontSize: '1rem' }}>
            Drag and drop or click to upload photo
          </div>
          <div className="upload-hint" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            JPG, PNG, or WEBP (Max {MAX_FILE_SIZE_MB}MB)
          </div>

          <div style={{ marginTop: '14px' }}>
            <span
              className="btn btn-sm"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid #cbd5e1',
                color: 'var(--text-main)',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              📁 Choose Photo File
            </span>
          </div>

          <input
            type="file"
            id="garbage-image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {/* Image Preview */}
      {image && (
        <div
          className="image-uploader has-image"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            padding: '12px',
          }}
        >
          <div className="image-preview" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={image}
              alt="Selected garbage report"
              style={{
                maxHeight: '220px',
                width: 'auto',
                maxWidth: '100%',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
              }}
            />
            <div
              className="image-preview-info"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '12px',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                alignItems: 'center',
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                📁 {fileName || 'garbage-photo.jpg'}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={handleRemove}
                style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
              >
                ✕ Remove Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {displayedError && (
        <p className="form-error" role="alert" style={{ marginTop: '8px' }}>
          {displayedError}
        </p>
      )}
    </div>
  );
}

export default ImageUploader;
