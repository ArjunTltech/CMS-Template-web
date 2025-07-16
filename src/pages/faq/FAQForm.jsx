import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import playNotificationSound from '../../utils/playNotification';

function FAQForm({ onFAQCreated, initialData, mode, setIsDrawerOpen, faqs }) {
  const [faq, setFaq] = useState({
    question: '',
    answer: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFaq({
        question: initialData.question || '',
        answer: initialData.answer || ''
      });
    } else if (mode === "add") {
      setFaq({
        question: '',
        answer: ''
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [mode, initialData, faqs]);

  const validateField = (name, value) => {
    const wordCount = value.trim().split(/\s+/).length;
    
    switch (name) {
      case 'question':
        if (value.trim().length < 5) {
          return "Question must be at least 5 characters long";
        }
        
        if (faqs && Array.isArray(faqs)) {
          const duplicates = faqs.filter(
            (existingFAQ) => 
              existingFAQ.question.trim().toLowerCase() === value.trim().toLowerCase() &&
              (mode !== "edit" || existingFAQ.id !== initialData?.id)
          );
          
          if (duplicates.length > 0) {
            return "This question already exists. Please enter a different question.";
          }
        }
        return null;
  
      case 'answer':
        return wordCount >= 10 && wordCount <= 45
          ? null
          : "Answer must be between 10 and 45 words long";
  
      default:
        return null;
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    const questionError = validateField('question', faq.question);
    if (questionError) newErrors.question = questionError;

    const answerError = validateField('answer', faq.answer);
    if (answerError) newErrors.answer = answerError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onFAQCreated({
        question: faq.question.trim(),
        answer: faq.answer.trim()
      });
      playNotificationSound();
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Question <span className="text-error">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter FAQ question"
          className={`input input-bordered w-full ${errors.question ? 'input-error' : ''}`}
          value={faq.question}
          onChange={(e) => {
            const newQuestion = e.target.value;
            setFaq({ ...faq, question: newQuestion });
            setErrors(prev => ({
              ...prev,
              question: validateField('question', newQuestion)
            }));
          }}
        />
        {errors.question && <p className="text-error text-sm mt-1">{errors.question}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Answer <span className="text-error">*</span>
        </label>
        <textarea
          placeholder="Enter FAQ answer"
          className={`textarea textarea-bordered w-full ${errors.answer ? 'textarea-error' : ''}`}
          rows="4"
          value={faq.answer}
          onChange={(e) => {
            const newAnswer = e.target.value;
            setFaq({ ...faq, answer: newAnswer });
            setErrors(prev => ({
              ...prev,
              answer: validateField('answer', newAnswer)
            }));
          }}
        ></textarea>
        {errors.answer && <p className="text-error text-sm mt-1">{errors.answer}</p>}
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>
            {mode === "add" ? "Creating FAQ..." : "Updating FAQ..."}
          </>
        ) : (
          mode === "add" ? "Create FAQ" : "Update FAQ"
        )}
      </button>
    </form>
  );
}

export default FAQForm;