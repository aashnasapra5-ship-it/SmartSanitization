/* ========================================
   ImageUploader Component
   ========================================
   Demonstrates: Props, useState (image preview), event handling,
   FileReader API, conditional rendering, form inputs (<input type="file">)
   ======================================== */

import { useState } from 'react';

function ImageUploader({ image, onImageChange }) {
  /*
    image      — the current image data (base64 string or null)
    onImageChange — function called with (imageData, fileName) or (null, null) to remove
  */
  const [fileName, setFileName] = useState('');

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate that it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Read the image and convert to base64 for preview and localStorage
    const reader = new FileReader();
    reader.onload = function (e) {
      onImageChange(e.target.result, file.name);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    onImageChange(null, null);
    setFileName('');
  }

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="garbage-image">
        Upload Image *
      </label>

      {/* Show upload area if no image selected */}
      {!image && (
        <label className="image-uploader" htmlFor="garbage-image">
          <div className="upload-icon">📷</div>
          <div className="upload-text">Click to upload a garbage image</div>
          <div className="upload-hint">Supports JPG, PNG, WEBP</div>
          <input
            type="file"
            id="garbage-image"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {/* Show image preview if image is selected */}
      {image && (
        <div className="image-uploader has-image">
          <div className="image-preview">
            <img src={image} alt="Selected garbage" />
            <div className="image-preview-info">
              <span>{fileName}</span>
              <button
                type="button"
                className="image-remove-btn"
                onClick={handleRemove}
              >
                ✕ Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
