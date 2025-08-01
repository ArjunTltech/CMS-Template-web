import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

function ServiceForm({ onServiceSubmit, initialData, mode, setIsDrawerOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [taglinedescription, setTaglineDescription] = useState("");
  const [points, setPoints] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.shortDescription || "");
      setTagline(initialData.tagline || "");
      setTaglineDescription(initialData.taglinedescription || "");
      setPoints(initialData.points || [""]);
      setImagePreview(initialData.image || null);
    } else {
      setTitle("");
      setDescription("");
      setTagline("");
      setTaglineDescription("");
      setPoints([""]);
      setImageFile(null);
      setImagePreview(null);
    }
    setErrors({});
    setIsSubmitting(false);
  }, [mode, initialData]);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim().length >= 3 ? null : "Title must be at least 3 characters long";
      case 'description':
        return value.trim().length >= 10 ? null : "Description must be at least 10 characters long";
      case 'points':
        return value.every(point => point.trim().length >= 5) ? null : "Each point must be at least 5 characters long";
      case 'image':
        if (mode === 'edit' && !value) return null;
        return value ? null : "Image is required";
      case 'tagline':
        return value.trim().length === 0 || value.trim().length >= 5 ? null : "Tagline must be at least 5 characters long";
      case 'taglinedescription':
        return value.trim().length === 0 || value.trim().length >= 10 ? null : "Tagline description must be at least 10 characters long";
      default:
        return null;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload JPEG, PNG, or GIF.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (inputRef.current) inputRef.current.value = "";
    setErrors(prev => ({ ...prev, image: "Image is required" }));
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
    const pointError = validateField('points', newPoints);
    setErrors(prev => ({ ...prev, points: pointError }));
  };

  const addPoint = () => setPoints([...points, ""]);

  const removePoint = (index) => {
    if (points.length > 1) {
      const newPoints = points.filter((_, i) => i !== index);
      setPoints(newPoints);
      const pointError = validateField('points', newPoints);
      setErrors(prev => ({ ...prev, points: pointError }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    const fieldsToValidate = [
      { name: 'title', value: title },
      { name: 'description', value: description },
      { name: 'points', value: points },
      { name: 'image', value: imageFile || imagePreview },
      { name: 'tagline', value: tagline },
      { name: 'taglinedescription', value: taglinedescription }
    ];

    fieldsToValidate.forEach(({ name, value }) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const serviceData = {
        id: mode === "edit" ? initialData.id : uuidv4(),
        title,
        shortDescription: description,
        tagline,
        taglinedescription,
        points,
        image: imagePreview || initialData?.image,
        createdAt: mode === "edit" ? initialData.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        servicePoints: points.map(point => ({
          id: uuidv4(),
          text: point,
          serviceId: mode === "edit" ? initialData.id : uuidv4()
        }))
      };

      onServiceSubmit(serviceData, mode);
      toast.success(`Service ${mode === "add" ? "added" : "updated"} successfully!`);

      if (mode === "add") {
        setTitle("");
        setDescription("");
        setTagline("");
        setTaglineDescription("");
        setPoints([""]);
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error handling service:", error);
      toast.error("Failed to save service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block font-medium">
          Title <span className="text-error">*</span>
        </label>
        <input
          type="text"
          placeholder="Service title"
          className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors(prev => ({ ...prev, title: validateField('title', e.target.value) }));
          }}
        />
        {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">
          Description <span className="text-error">*</span>
        </label>
        <textarea
          className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
          placeholder="Service description..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors(prev => ({ ...prev, description: validateField('description', e.target.value) }));
          }}
        ></textarea>
        {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Tagline */}
      <div>
        <label className="block font-medium">Tagline</label>
        <input
          type="text"
          placeholder="Short tagline..."
          className={`input input-bordered w-full ${errors.tagline ? 'input-error' : ''}`}
          value={tagline}
          onChange={(e) => {
            setTagline(e.target.value);
            setErrors(prev => ({ ...prev, tagline: validateField('tagline', e.target.value) }));
          }}
        />
        {errors.tagline && <p className="text-error text-sm mt-1">{errors.tagline}</p>}
      </div>

      {/* Tagline Description */}
      <div>
        <label className="block font-medium">Tagline Description</label>
        <textarea
          placeholder="Tagline description..."
          className={`textarea textarea-bordered w-full ${errors.taglinedescription ? 'textarea-error' : ''}`}
          value={taglinedescription}
          onChange={(e) => {
            setTaglineDescription(e.target.value);
            setErrors(prev => ({ ...prev, taglinedescription: validateField('taglinedescription', e.target.value) }));
          }}
          rows={2}
        ></textarea>
        {errors.taglinedescription && <p className="text-error text-sm mt-1">{errors.taglinedescription}</p>}
      </div>

      {/* Bullet Points */}
      <div>
        <label className="block font-medium">
          Bullet Points <span className="text-error">*</span>
        </label>
        {points.map((point, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              className={`input input-bordered w-full ${errors.points ? 'input-error' : ''}`}
              placeholder={`Point ${index + 1}`}
              value={point}
              onChange={(e) => handlePointChange(index, e.target.value)}
            />
            {points.length > 1 && (
              <button
                type="button"
                className="btn btn-error btn-xs"
                onClick={() => removePoint(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        {errors.points && <p className="text-error text-sm mt-1">{errors.points}</p>}
        <button type="button" className="btn btn-primary btn-sm" onClick={addPoint}>
          + Add Point
        </button>
      </div>

      {/* Image Upload */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Normal Image <span className="text-error"> *</span>
          <span> ( JPG/PNG,-1024×768 px, less than 2 MB, no high-res files.)</span>
          </span>
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-base-100 ${errors.image ? 'border-error' : ''}`}
          onClick={() => inputRef.current?.click()}
        >
          {!imagePreview ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary mb-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v3.586l-1.293-1.293a1 1 0 00-1.414 0L10 12l-2.293-2.293a1 1 0 00-1.414 0L4 12V5zm0 10v-1.586l2.293-2.293a1 1 0 011.414 0L10 13l3.293-3.293a1 1 0 011.414 0L16 12.414V15H4z" />
              </svg>
              <p className="text-neutral-content">Drag and drop or click to upload</p>
            </>
          ) : (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
              <button type="button" className="absolute top-2 right-2 btn btn-xs btn-error" onClick={handleRemoveImage}>
                Remove
              </button>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleImageChange} />
        </div>
        {errors.image && <p className="text-error text-sm mt-1">{errors.image}</p>}
      </div>

      {/* Submit Button */}
      <div>
        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              {mode === "add" ? "Adding Service..." : "Updating Service..."}
            </>
          ) : (
            mode === "add" ? "Add Service" : "Update Service"
          )}
        </button>
      </div>
    </form>
  );
}

export default ServiceForm;