import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { DEFAULT_CASE_STUDY_IMAGE,generateId} from "../../components/data/dummyCaseStudies";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CaseForm({ 
  onClientCreated, 
  refreshClientList, 
  initialData, 
  mode, 
  setIsDrawerOpen,
  onAddClient,
  onUpdateClient 
}) {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const inputRef = useRef(null);
  const quillRef = useRef(null);
  const formMounted = useRef(true);
  const cancelTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  
  // Min and max word count constraints for description
  const MIN_WORD_COUNT = 10;
  const MAX_WORD_COUNT = 5000;
  
  const [errors, setErrors] = useState({});
  
  // Quill editor modules and formats configuration
  const quillModules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link'],
        ['clean'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
      ],
      handlers: {},
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link',
    'align', 'color', 'background', 'font',
    'blockquote', 'code-block',
  ];

  // Component mount/unmount tracking
  useEffect(() => {
    formMounted.current = true;
    return () => {
      if (cancelTimeoutRef.current) {
        clearTimeout(cancelTimeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      
      cleanupImagePreview();
      formMounted.current = false;
    };
  }, []);

  // Helper function to cleanup image preview URL
  const cleanupImagePreview = () => {
    if (imagePreview && (!initialData || imagePreview !== initialData.image) && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  // Add tooltips to the toolbar buttons after component mounts
  useEffect(() => {
    if (!quillRef.current) return;
    
    const addTooltips = () => {
      try {
        const toolbar = quillRef.current.getEditor().getModule('toolbar');
        
        if (toolbar && toolbar.container) {
          const buttons = toolbar.container.querySelectorAll('button, .ql-picker');
          
          buttons.forEach(button => {
            const className = Array.from(button.classList)
              .find(cls => cls.startsWith('ql-'));
              
            if (className) {
              const buttonType = className.replace('ql-', '');
              const tooltipText = getTooltipText(buttonType);
              if (tooltipText) {
                button.setAttribute('title', tooltipText);
              }
            }
          });
        }
      } catch (err) {
        console.error("Error adding tooltips:", err);
      }
    };

    addTooltips();
    const tooltipTimer = setTimeout(addTooltips, 500);
    
    return () => clearTimeout(tooltipTimer);
  }, [quillRef.current, description]);
  
  // Function to get tooltip text based on button type
  const getTooltipText = (buttonType) => {
    const tooltips = {
      'bold': 'Bold',
      'italic': 'Italic',
      'underline': 'Underline',
      'strike': 'Strikethrough',
      'header': 'Heading',
      'blockquote': 'Blockquote',
      'code-block': 'Code Block',
      'link': 'Insert Link',
      'image': 'Insert Image',
      'clean': 'Clear Formatting',
      'list': 'List',
      'bullet': 'Bullet List',
      'indent': 'Indent',
      'color': 'Text Color',
      'background': 'Background Color',
      'font': 'Font Family',
      'align': 'Text Alignment',
      'ordered': 'Ordered List',
    };
    
    return tooltips[buttonType] || buttonType.charAt(0).toUpperCase() + buttonType.slice(1);
  };

  // Function to strip HTML tags and count words
  const getWordCountFromHTML = (html) => {
    if (!html) return 0;
    
    const plainText = html.replace(/<[^>]*>/g, '').trim();
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    
    return words.length;
  };

  // Calculate word count from description
  useEffect(() => {
    if (!formMounted.current || isSubmitting || isCancelling) return;
    
    if (description) {
      const count = getWordCountFromHTML(description);
      setWordCount(count);
      
      let descriptionError = "";
      if (!description.trim()) {
        descriptionError = "Description is required.";
      } else if (count < MIN_WORD_COUNT) {
        descriptionError = `Description must be at least ${MIN_WORD_COUNT} words (currently ${count}).`;
      } else if (count > MAX_WORD_COUNT) {
        descriptionError = `Description cannot exceed ${MAX_WORD_COUNT} words (currently ${count}).`;
      }
      
      setErrors(prev => ({
        ...prev,
        description: descriptionError
      }));
    } else {
      setWordCount(0);
      setErrors(prev => ({
        ...prev,
        description: "Description is required."
      }));
    }
  }, [description, isSubmitting, isCancelling]);

  // Load theme from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(localStorage.getItem("theme") || "light");
    }
  }, []);
  
  const validateField = (name, value, mode) => {
    if (isSubmitting || isCancelling) return null;
    
    const containsNumbers = /\d/;
  
    switch (name) {
      case 'title':
        if (value.trim().length < 3) {
          return "Title must be at least 3 characters long";
        }
        if (containsNumbers.test(value)) {
          return "Title cannot contain numbers";
        }
        return null;
  
      case 'description':
        if (!value.trim()) {
          return "Description is required";
        }
        
        const wordCount = getWordCountFromHTML(value);
        
        if (wordCount < MIN_WORD_COUNT) {
          return `Description must be at least ${MIN_WORD_COUNT} words (currently ${wordCount})`;
        }
        
        if (wordCount > MAX_WORD_COUNT) {
          return `Description cannot exceed ${MAX_WORD_COUNT} words (currently ${wordCount})`;
        }
        
        return null;
  
      case 'subtitle':
        if (!value) return null; // optional
        if (value.trim().length < 3) {
          return "Subtitle must be at least 3 characters long";
        }
        if (containsNumbers.test(value)) {
          return "Subtitle cannot contain numbers";
        }
        return null;
  
      case 'image':
        // Always use default image, so no validation needed
        return null;
  
      case 'author':
        if (!value) return null; // optional
        return value.trim().length >= 3
          ? null
          : "Author must be at least 3 characters long";
  
      default:
        return null;
    }
  };
  
  // Load initial data when component mounts or mode changes
  useEffect(() => {
    if (cancelTimeoutRef.current) {
      clearTimeout(cancelTimeoutRef.current);
      cancelTimeoutRef.current = null;
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    
    setIsCancelling(false);
    
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setSubTitle(initialData.subTitle || "");
      setAuthor(initialData.author || "");
      setDescription(initialData.description || "");
      
      if (initialData.image) {
        setImagePreview(initialData.image);
      } else {
        setImagePreview(DEFAULT_CASE_STUDY_IMAGE);
      }
      
      if (initialData.description) {
        const count = getWordCountFromHTML(initialData.description);
        setWordCount(count);
      }
      
      setErrors({});
    } else if (mode === "add") {
      resetForm();
    }
  }, [mode, initialData, setIsDrawerOpen]);

  const handleImageChange = (event) => {
    if (isCancelling) return;
    
    const file = event.target.files[0];
    if (file) {
      setErrors(prev => ({
        ...prev,
        image: ""
      }));
      setImageFile(file);
      
      cleanupImagePreview();
      setImagePreview(URL.createObjectURL(file));
    } else {
      handleRemoveImage();
    }
  };

  const handleRemoveImage = (e) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (isCancelling) return;
    
    cleanupImagePreview();
    
    setImageFile(null);
    // Always set to default image instead of null
    setImagePreview(DEFAULT_CASE_STUDY_IMAGE);
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const resetForm = () => {
    if (!formMounted.current) return;
    
    cleanupImagePreview();
    
    setTitle("");
    setSubTitle("");
    setDescription("");
    setAuthor("");
    setImageFile(null);
    setImagePreview(DEFAULT_CASE_STUDY_IMAGE);
    setWordCount(0);
    setErrors({});
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isSubmitting || isCancelling) return;
    setIsSubmitting(true);
    
    try {
      const newErrors = {};

      const titleError = validateField('title', title);
      if (titleError) newErrors.title = titleError;
      
      const subtitleError = validateField('subtitle', subTitle);
      if (subtitleError) newErrors.subtitle = subtitleError;

      const descriptionError = validateField('description', description, mode);
      if (descriptionError) newErrors.description = descriptionError;

      const authorError = validateField('author', author, mode);
      if (authorError) newErrors.author = authorError;
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }
      
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === "add") {
        const newCaseStudy = {
          id: generateId(),
          title,
          subTitle,
          author,
          description,
          image: DEFAULT_CASE_STUDY_IMAGE, // Always use default image
          createdAt: new Date().toISOString()
        };

        if (onAddClient) {
          onAddClient(newCaseStudy);
        }

        toast.success("Case study created successfully!");
      } else if (mode === "edit" && initialData) {
        const updatedCaseStudy = {
          ...initialData,
          title,
          subTitle,
          author,
          description,
          image: imagePreview || DEFAULT_CASE_STUDY_IMAGE, // Use preview or default
          updatedAt: new Date().toISOString()
        };

        if (onUpdateClient) {
          onUpdateClient(updatedCaseStudy);
        }
        
        toast.success("Case study updated successfully!");
      }

      if (formMounted.current) {
        // Don't call refreshClientList since we're already updating state via onAddClient/onUpdateClient
        resetForm();
        setIsDrawerOpen(false);
      }
    } catch (error) {
      console.error("Error handling case studies:", error);
      toast.error("Failed to save case studies. Please try again.");
    } finally {
      if (formMounted.current) {
        setLoading(false);
        setIsSubmitting(false);
      }
    }
  };
  
  // Calculate word count status for styling
  const getWordCountStatus = () => {
    if (wordCount > MAX_WORD_COUNT) {
      return "text-error";
    } else if (wordCount < MIN_WORD_COUNT) {
      return "text-error";
    } else if (wordCount > MAX_WORD_COUNT * 0.9) {
      return "text-warning";
    }
    return "text-success";
  };
  
  // Handle ReactQuill content change
  const handleContentChange = (value) => {
    if (isCancelling) return;
    setDescription(value);
  };
  
  const onCancel = () => {
    if (isCancelling) return;
    
    setIsCancelling(true);
    
    if (cancelTimeoutRef.current) {
      clearTimeout(cancelTimeoutRef.current);
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    
    setErrors({});
    setIsDrawerOpen(false);
    
    resetTimeoutRef.current = setTimeout(() => {
      if (formMounted.current) {
        setIsCancelling(false);
      }
      resetTimeoutRef.current = null;
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Title <span className="text-error">*</span></span>
        </label>
        <input
          type="text"
          placeholder="Client name"
          className={`input input-bordered ${errors.title ? 'input-error' : 'border-accent'}`}
          value={title}
          onChange={(e) => {
            if (isCancelling) return;
            setTitle(e.target.value);
            if (!isSubmitting && !isCancelling) {
              const titleError = validateField('title', e.target.value, mode);
              setErrors(prev => ({
                ...prev,
                title: titleError
              }));
            }
          }}
          disabled={isCancelling}
        />
        {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Subtitle Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">SubTitle</span>
        </label>
        <input
          type="text"
          placeholder="Enter subtitle"
          className={`input input-bordered ${errors.subtitle ? 'input-error' : 'border-accent'}`}
          value={subTitle}
          onChange={(e) => {
            if (isCancelling) return;
            setSubTitle(e.target.value);
            if (!isSubmitting && !isCancelling) {
              const subTitleError = validateField('subtitle', e.target.value, mode);
              setErrors(prev => ({
                ...prev,
                subtitle: subTitleError
              }));
            }
          }}
          disabled={isCancelling}
        />
        {errors.subtitle && <p className="text-error text-sm mt-1">{errors.subtitle}</p>}
      </div>
      
      {/* Author Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Author</span>
        </label>
        <input
          type="text"
          placeholder="Enter author name"
          className={`input input-bordered ${errors.author ? 'input-error' : 'border-accent'}`}
          value={author}
          onChange={(e) => {
            if (isCancelling) return;
            setAuthor(e.target.value);
            if (!isSubmitting && !isCancelling) {
              const authorError = validateField('author', e.target.value, mode);
              setErrors(prev => ({
                ...prev,
                author: authorError
              }));
            }
          }}
          disabled={isCancelling}
        />
        {errors.author && <p className="text-error text-sm mt-1">{errors.author}</p>}
      </div>

      {/* Content Input with ReactQuill */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Description <span className="text-error">*</span></span>
          <span className={`label-text-alt ${getWordCountStatus()}`}>
            {wordCount}/{MAX_WORD_COUNT} words
          </span>
        </label>
        <div className={`quill-container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={description}
            onChange={handleContentChange}
            modules={quillModules}
            formats={quillFormats}
            className={`custom-quill ${errors.description ? 'quill-error' : ''}`}
            placeholder="Write case study description..."
            readOnly={isCancelling}
          />
          <style jsx global>{`
            .quill-container {
              border-radius: 0.5rem;
              overflow: hidden;
            }
            
            .quill-container .ql-container {
              min-height: 200px;
              max-height: 400px;
              overflow-y: auto;
              font-size: 16px;
              font-family: inherit;
            }
            
            .quill-container .ql-editor {
              min-height: 200px;
              padding: 1rem;
            }
            
            .quill-container .ql-toolbar {
              border-top-left-radius: 0.5rem;
              border-top-right-radius: 0.5rem;
              flex-wrap: wrap;
            }
            
            .quill-container .ql-toolbar button {
              position: relative;
            }
            
            .quill-error .ql-toolbar {
              border-color: #f56565;
            }
            
            .quill-error .ql-container {
              border-color: #f56565;
            }
            
            .light-mode .ql-editor::before {
              color: gray !important;
              opacity: 0.6;
            }

            .dark-mode .ql-editor::before {
              color: white !important;
              opacity: 0.6;
            }
            
            .dark-mode .ql-toolbar button {
              color: #e2e8f0;
            }
            
            .dark-mode .ql-toolbar button svg path {
              stroke: #e2e8f0;
            }
            
            .dark-mode .ql-toolbar .ql-stroke {
              stroke: #e2e8f0;
            }
            
            .dark-mode .ql-toolbar .ql-fill {
              fill: #e2e8f0;
            }
            
            .dark-mode .ql-toolbar .ql-picker {
              color: #e2e8f0;
            }
            
            .ql-toolbar button {
              margin: 2px;
            }
            
            .ql-editor img {
              max-width: 100%;
              height: auto;
            }
            
            .ql-editor table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 1rem;
            }
            
            .ql-editor td {
              border: 1px solid #ced4da;
              padding: 8px;
            }
            
            .ql-editor pre {
              background-color: #f1f1f1;
              color: #333;
              padding: 0.75rem;
              border-radius: 4px;
              font-family: monospace;
              white-space: pre-wrap;
            }
            
            .dark-mode .ql-editor pre {
              background-color: #2d3748;
              color: #e2e8f0;
            }
          `}</style>
        </div>
        {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Image Display Section */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Image 
            <span className="text-info ml-2">(Default template image will be used)</span>
          </span>
        </label>
        <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center border-neutral">
          <div className="relative">
            <img
              src={imagePreview || DEFAULT_CASE_STUDY_IMAGE}
              alt="Case Study Preview"
              className="w-full h-auto max-h-48 rounded-lg shadow-lg object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <p className="text-white text-sm font-medium">Default Template Image</p>
            </div>
          </div>
          <p className="text-neutral-content text-sm mt-2">
            This template uses a default image for all case studies
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-control d-flex justify-content-end align-items-center gap-2">
        <button 
          type="submit" 
          className="btn btn-primary d-flex align-items-center" 
          disabled={loading || isCancelling || wordCount < MIN_WORD_COUNT || wordCount > MAX_WORD_COUNT}
        >
          {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
          {loading ? (mode === "add" ? "Creating..." : "Updating...") : mode === "add" ? "Create" : "Update"}
        </button>
        <button 
          type="button" 
          className="btn" 
          onClick={onCancel}
          disabled={isCancelling}
        >
          {isCancelling ? "Closing..." : "Cancel"}
        </button>
      </div>
    </form>
  );
}

export default CaseForm;