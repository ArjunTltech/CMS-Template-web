import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { dummyDocuments, simulateApiDelay, createSuccessResponse } from '../data/dummyDocument';
import playNotificationSound from '../../utils/playNotification';

// Mock notification sound function
// const playNotificationSound = () => {
//   console.log('🔊 Notification sound played!');
//   // You can implement actual sound playing logic here if needed
// };

const DocumentEditor = () => {
  const [selectedOption, setSelectedOption] = useState('PRIVACY');
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [documents, setDocuments] = useState(dummyDocuments);
  const [isLoading, setIsLoading] = useState(false);

  const quillRef = useRef(null);

  // Simulate GET request to fetch document content
  const fetchContent = async (option) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await simulateApiDelay(300);
      
      const document = documents[option];
      if (document) {
        console.log(`📄 Fetched ${option} document successfully`);
        setValue(document.content);
      } else {
        console.log(`❌ Document ${option} not found`);
        setValue('');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch document content.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    try {
      setIsSaving(true);
      
      const payload = {
        title: selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1),
        content: value,
        type: selectedOption,
      };
      
      const plainTextContent = payload.content.replace(/<[^>]*>/g, "").trim();
      const wordCount = plainTextContent.split(/\s+/).filter(word => word.length > 0).length;
    
      // Validation logic
      if (wordCount < 200) {
        toast.error("Content must have at least 200 words.");
        return;
      } else if (wordCount > 550 && selectedOption === "PRIVACY") {
        toast.error("Content cannot exceed 550 words.");
        return;
      } else if (wordCount > 420 && selectedOption === "TERMS") {
        toast.error("Content cannot exceed 420 words.");
        return;
      } else if (plainTextContent.length === 0) {
        toast.error("Details required");
        return;
      }

      // Simulate API delay
      await simulateApiDelay(800);
      
      // Update the documents state with new content
      const updatedDocument = {
        ...documents[selectedOption],
        title: payload.title,
        content: payload.content,
        wordCount: wordCount,
        lastUpdated: new Date().toISOString()
      };

      setDocuments(prevDocuments => ({
        ...prevDocuments,
        [selectedOption]: updatedDocument
      }));

      // Simulate successful response
      console.log(`✅ ${selectedOption} document saved successfully!`);
      console.log('Updated document:', updatedDocument);
      
      playNotificationSound();
      toast.success(`${selectedOption} document has been saved successfully!`);
      
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save document content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchContent(selectedOption);
  }, [selectedOption]);

  // Log current document stats for debugging
  useEffect(() => {
    const currentDoc = documents[selectedOption];
    if (currentDoc) {
      console.log(`📊 Current ${selectedOption} document stats:`, {
        wordCount: currentDoc.wordCount,
        lastUpdated: currentDoc.lastUpdated
      });
    }
  }, [documents, selectedOption]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-neutral-content">Compliance</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your Compliance</p>
          </div>
        </div>
        <div className="flex gap-2 ">
          {['PRIVACY', 'TERMS'].map((option) => (
            <button
              key={option}
              className={`btn ${selectedOption === option ? 'btn-primary' : 'btn-outline'
                }`}
              onClick={() => setSelectedOption(option)}
              disabled={isLoading || isSaving}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
          <button
            className={`btn btn-outline hover:btn-success mr-10`}
            onClick={saveContent}
            disabled={isSaving || isLoading}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div
        className="overflow-y-scroll min-h-[100vh]"
        // style={{
        //   height: 'calc(100vh - 200px)',
        // }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
            <span className="ml-2">Loading document...</span>
          </div>
        ) : (
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            style={{
              height: '100vh',
              maxHeight: '100%',
              borderRadius: '8px',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;