import React, { useState, useRef, useEffect } from "react";
import { formatDateForDisplay } from "../../components/data/dummyBlogs";


const ContentEditor = ({ value, onChange, hasError, wordCount, MAX_WORD_COUNT, MIN_WORD_COUNT }) => (
  <div className="form-control mb-4">
    <label className="label">
      <span className="label-text">Content <span className="text-error"> *</span></span>
      <span className="label-text-alt">
        {wordCount}/{MAX_WORD_COUNT} words
      </span>
    </label>
    <textarea
      className={`textarea textarea-bordered h-32 ${hasError ? 'textarea-error' : ''}`}
      placeholder="Write your post content..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="text-sm text-gray-500 mt-1">
      Minimum {MIN_WORD_COUNT} words required
    </div>
  </div>
);

function BlogPostForm({ onBlogCreated, initialData, mode, setIsDrawerOpen }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const MAX_WORD_COUNT = 5000;
  const MIN_WORD_COUNT = 10;

  // Default image for all blog posts
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop";

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    date: "",
    excerpt: "",
    content: ""
  });

  const isResetting = useRef(false);

  // Month options for grammatical display
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  // Days array for day selection
  const generateDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({
        value: i < 10 ? `0${i}` : `${i}`,
        label: `${i}`
      });
    }
    return days;
  };

  const days = generateDays();

  // Years array for year selection
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push({
        value: `${i}`,
        label: `${i}`
      });
    }
    return years;
  };

  const years = generateYears();

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0];
  };

  const parseDateToComponents = (dateString) => {
    if (!dateString) return { day: "", month: "", year: "" };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: "", month: "", year: "" };

    const monthValue = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayValue = date.getDate().toString().padStart(2, '0');
    const yearValue = date.getFullYear().toString();

    return {
      day: dayValue,
      month: monthValue,
      year: yearValue
    };
  };

  const getWordCountFromHTML = (html) => {
    if (!html) return 0;
    const plainText = html.replace(/<[^>]*>/g, '').trim();
    const words = plainText.split(/\s+/).filter(word => word.length > 0);
    return words.length;
  };

  // Update word count when content changes
  useEffect(() => {
    if (content) {
      const count = getWordCountFromHTML(content);
      setWordCount(count);

      let contentError = "";
      if (!content.trim()) {
        contentError = "Content is required.";
      } else if (count < MIN_WORD_COUNT) {
        contentError = `Content must be at least ${MIN_WORD_COUNT} words (currently ${count}).`;
      } else if (count > MAX_WORD_COUNT) {
        contentError = `Content cannot exceed ${MAX_WORD_COUNT} words (currently ${count}).`;
      }

      setErrors(prev => ({
        ...prev,
        content: contentError
      }));
    } else {
      setWordCount(0);
      setErrors(prev => ({
        ...prev,
        content: "Content is required."
      }));
    }
  }, [content]);

  // Update date when components change
  useEffect(() => {
    if (day && month && year) {
      const newDate = `${year}-${month}-${day}`;
      setDate(newDate);

      const dateError = validateDate(newDate);
      setErrors(prev => ({
        ...prev,
        date: dateError
      }));
    }
  }, [day, month, year]);

  const validateTitle = (value) => {
    if (!value.trim()) {
      return "Title is required";
    }
    if (value.trim().length < 5) {
      return "Title must be at least 5 characters long";
    }
    if (value.trim().length > 200) {
      return "Title cannot exceed 200 characters";
    }
    return "";
  };

  const validateAuthor = (value) => {
    if (!value.trim()) {
      return "Author name is required";
    }
    if (value.trim().length < 2) {
      return "Author name must be at least 2 characters long";
    }
    if (value.trim().length > 50) {
      return "Author name cannot exceed 50 characters";
    }
    return "";
  };

  const validateDate = (value) => {
    if (!value) {
      return "Date is required";
    }
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return "Date cannot be in the future";
    }
    return "";
  };

  const validateExcerpt = (value) => {
    if (!value.trim()) {
      return "Excerpt is required";
    }
    if (value.trim().length < 20) {
      return "Excerpt must be at least 20 characters long";
    }
    if (value.trim().length > 1000) {
      return "Excerpt cannot exceed 1000 characters";
    }
    return "";
  };

  const validateContent = (value) => {
    if (!value || !value.trim()) {
      return "Content is required";
    }
    const count = getWordCountFromHTML(value);
    if (count < MIN_WORD_COUNT) {
      return `Content must be at least ${MIN_WORD_COUNT} words (currently ${count}).`;
    }
    if (count > MAX_WORD_COUNT) {
      return `Content cannot exceed ${MAX_WORD_COUNT} words (currently ${count}).`;
    }
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return validateTitle(value);
      case 'author':
        return validateAuthor(value);
      case 'date':
        return validateDate(value);
      case 'excerpt':
        return validateExcerpt(value);
      case 'content':
        return validateContent(value);
      default:
        return "";
    }
  };

  const handleDateComponentChange = (e) => {
    const { name, value } = e.target;
    if (name === 'day') {
      setDay(value);
    } else if (name === 'month') {
      setMonth(value);
    } else if (name === 'year') {
      setYear(value);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'excerpt':
        setExcerpt(value);
        break;
    }
    errorMessage = validateField(name, value);

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const validateForm = () => {
    const titleError = validateTitle(title);
    const authorError = validateAuthor(author);
    const dateError = validateDate(date);
    const excerptError = validateExcerpt(excerpt);
    const contentError = validateContent(content);

    const newErrors = {
      title: titleError,
      author: authorError,
      date: dateError,
      excerpt: excerptError,
      content: contentError
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error);
    return !hasErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create blog data object with default image
      const blogData = {
        title,
        author,
        date,
        excerpt,
        content,
        image: DEFAULT_IMAGE // Use default image for all posts
      };

      // Call the parent callback with the blog data
      onBlogCreated(blogData);

      // Reset form if in add mode
      if (mode === "add") {
        resetForm();
      }

    } catch (error) {
      console.error("Error handling blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (isResetting.current) return;
    isResetting.current = true;

    setTitle("");
    setAuthor("");
    setDate("");
    setDay("");
    setMonth("");
    setYear("");
    setExcerpt("");
    setContent("");
    setWordCount(0);
    setErrors({
      title: "",
      author: "",
      date: "",
      excerpt: "",
      content: ""
    });

    setTimeout(() => {
      isResetting.current = false;
    }, 100);
  };

  // Initialize form data when component mounts or mode changes
  useEffect(() => {
    if (isResetting.current) return;

    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setAuthor(initialData.author || "");

      const formattedInputDate = formatDateForInput(initialData.date);
      setDate(formattedInputDate);

      const { day, month, year } = parseDateToComponents(initialData.date);
      setDay(day);
      setMonth(month);
      setYear(year);

      setExcerpt(initialData.excerpt || "");
      setContent(initialData.content || "");

      if (initialData.content) {
        const count = getWordCountFromHTML(initialData.content);
        setWordCount(count);
      }
    } else if (mode === "add") {
      resetForm();
    }
  }, [mode, initialData]);

  const onCancel = () => {
    setIsDrawerOpen(false);
    setErrors({
      title: "",
      author: "",
      date: "",
      excerpt: "",
      content: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Title <span className="text-error"> *</span></span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Post title"
          className={`input input-bordered ${errors.title ? 'input-error' : 'border-accent'}`}
          value={title}
          onChange={handleInputChange}
        />
        {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Author Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Author <span className="text-error"> *</span></span>
        </label>
        <input
          type="text"
          name="author"
          placeholder="Author name"
          className={`input input-bordered ${errors.author ? 'input-error' : 'border-accent'}`}
          value={author}
          onChange={handleInputChange}
        />
        {errors.author && <p className="text-error text-sm mt-1">{errors.author}</p>}
      </div>

      {/* Date Selection */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Date <span className="text-error"> *</span></span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <select
            name="day"
            className={`select select-bordered ${errors.date ? 'select-error' : 'border-accent'}`}
            value={day}
            onChange={handleDateComponentChange}
          >
            <option value="" disabled>Day</option>
            {days.map(dayOption => (
              <option key={dayOption.value} value={dayOption.value}>
                {dayOption.label}
              </option>
            ))}
          </select>

          <select
            name="month"
            className={`select select-bordered ${errors.date ? 'select-error' : 'border-accent'}`}
            value={month}
            onChange={handleDateComponentChange}
          >
            <option value="" disabled>Month</option>
            {months.map(monthOption => (
              <option key={monthOption.value} value={monthOption.value}>
                {monthOption.label}
              </option>
            ))}
          </select>

          <select
            name="year"
            className={`select select-bordered ${errors.date ? 'select-error' : 'border-accent'}`}
            value={year}
            onChange={handleDateComponentChange}
          >
            <option value="" disabled>Year</option>
            {years.map(yearOption => (
              <option key={yearOption.value} value={yearOption.value}>
                {yearOption.label}
              </option>
            ))}
          </select>
        </div>
        {errors.date && <p className="text-error text-sm mt-1">{errors.date}</p>}
      </div>

      {/* Excerpt Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text flex items-center gap-1 group relative">
            Excerpt <span className="text-error">*</span>
            <span className="w-4 h-4 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center cursor-pointer">
              ℹ️
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 sm:left-full sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 mt-2 sm:mt-0 p-2 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[90vw] sm:w-max max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm whitespace-normal break-words z-50">
              A short summary or snippet that gives a quick overview of the full content.
            </span>
          </span>
        </label>
        <textarea
          name="excerpt"
          className={`textarea textarea-bordered ${errors.excerpt ? 'textarea-error' : ''}`}
          placeholder="Short summary of the blog post..."
          value={excerpt}
          onChange={handleInputChange}
        />
        {errors.excerpt && <p className="text-error text-sm mt-1">{errors.excerpt}</p>}
      </div>

      {/* Image Preview Section */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Image Preview</span>
        </label>
        <div className="border-2 border-dashed border-neutral rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <img
            src={DEFAULT_IMAGE}
            alt="Default blog image"
            className="w-full h-auto rounded-lg shadow-lg max-h-48 object-cover"
          />
          <p className="text-sm text-gray-500 mt-2">
            All blog posts will use this default image
          </p>
        </div>
      </div>

      {/* Content Editor */}
      <ContentEditor
        value={content}
        onChange={handleContentChange}
        hasError={Boolean(errors.content)}
        wordCount={wordCount}
        MAX_WORD_COUNT={MAX_WORD_COUNT}
        MIN_WORD_COUNT={MIN_WORD_COUNT}
      />
      {errors.content && <p className="text-error text-sm mt-1">{errors.content}</p>}

      {/* Submit Buttons */}
      <div className="form-control mt-6 flex flex-col gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || wordCount < MIN_WORD_COUNT || wordCount > MAX_WORD_COUNT}
        >
          {loading && <span className="loading loading-spinner loading-sm mr-2"></span>}
          {loading ? (mode === "add" ? "Creating..." : "Updating...") : mode === "add" ? "Create" : "Update"}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default BlogPostForm;