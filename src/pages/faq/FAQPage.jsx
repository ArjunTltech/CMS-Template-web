import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import FAQForm from './FAQForm';
import { toast } from 'react-toastify';
import DeleteConfirmModal from '../../components/ui/modal/DeleteConfirmModal';
import dummyFaqData from '../../components/data/dummyFaq';

const FAQPage = () => {
  const [faqs, setFaqs] = useState(dummyFaqData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editFAQ, setEditFAQ] = useState(null);
  const [mode, setMode] = useState("add");
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [nextId, setNextId] = useState(dummyFaqData.length + 1);

  // Generate a new ID for new FAQs
  const getNextId = () => {
    const newId = nextId;
    setNextId(newId + 1);
    return newId;
  };

  const handleAddNewFAQ = () => {
    setEditFAQ(null);
    setMode("add");
    setIsDrawerOpen(true);
  };

  const handleEditFAQ = (faq) => {
    setEditFAQ(faq);
    setMode("edit");
    setIsDrawerOpen(true);
  };

  const handleDeleteFAQ = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    setFaqToDelete(null);
    toast.success('FAQ deleted successfully');
  };

  const handleFAQCreated = (newFAQ) => {
    if (mode === "add") {
      // Add new FAQ with generated ID and correct order
      const faqWithId = {
        ...newFAQ,
        id: getNextId(),
        order: faqs.length + 1
      };
      setFaqs([...faqs, faqWithId]);
      toast.success('FAQ created successfully!');
    } else if (mode === "edit" && editFAQ) {
      // Update existing FAQ while preserving order
      setFaqs(faqs.map(faq => 
        faq.id === editFAQ.id ? { ...newFAQ, id: editFAQ.id, order: faq.order } : faq
      ));
      toast.success('FAQ updated successfully!');
    }
    setIsDrawerOpen(false);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Reorder FAQs locally
    const reorderedFAQs = Array.from(faqs);
    const [removed] = reorderedFAQs.splice(source.index, 1);
    reorderedFAQs.splice(destination.index, 0, removed);

    // Update order numbers based on new positions
    const updatedFAQs = reorderedFAQs.map((faq, index) => ({
      ...faq,
      order: index + 1,
    }));

    setFaqs(updatedFAQs);
    toast.success('FAQ order updated!');
  };

  return (
    <div className="min-h-screen relative">
      <div className="drawer drawer-end">
        <input
          id="faq-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => setIsDrawerOpen(!isDrawerOpen)}
        />
        <div className="drawer-content">
          <div className="md:flex space-y-2 md:space-y-0 block justify-between items-center mb-8">
            <div className='space-y-2'>
              <h1 className="text-3xl font-bold text-neutral-content">FAQ's</h1>
              <p>Total Faq's: {faqs.length}</p>
            </div>
            <button
              className="btn btn-primary gap-2"
              onClick={handleAddNewFAQ}
            >
              <Plus className="w-5 h-5" />
              Add FAQ
            </button>
          </div>

          {faqs.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="faq-list">
                {(provided) => (
                  <div
                    className="mx-auto space-y-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {faqs
                      .sort((a, b) => a.order - b.order)
                      .map((faq, index) => (
                        <Draggable key={faq.id} draggableId={faq.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-base-200 p-4 rounded-lg flex justify-between items-center"
                            >
                              <div className="flex-1 select-none">
                                <div className="text-xl font-bold text-accent">{faq.question}</div>
                                <p className="text-base-content">{faq.answer}</p>
                                <span className="text-sm opacity-70 ml-2">Order: {faq.order}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  className="btn btn-sm btn-square btn-ghost"
                                  onClick={() => handleEditFAQ(faq)}
                                >
                                  <Pencil className="w-6 h-6 text-success" />
                                </button>
                                <button
                                  className="btn btn-sm btn-square text-white btn-error"
                                  onClick={() => setFaqToDelete(faq.id)}
                                >
                                  <Trash2 className="w-6 h-6" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="w-full h-96 flex justify-center items-center">
              <p>No FAQs available</p>
            </div>
          )}
        </div>

        <div className="drawer-side">
          <label htmlFor="faq-drawer" className="drawer-overlay"></label>
          <div className="p-4 md:w-[40%] w-full sm:w-1/2 overflow-y-scroll bg-base-100 h-[50vh] text-base-content absolute bottom-4 right-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">{mode === "edit" ? 'Edit FAQ' : 'Add New FAQ'}</h2>
            <FAQForm
              onFAQCreated={handleFAQCreated}
              initialData={editFAQ}
              mode={mode}
              faqs={faqs}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>
        </div>
      </div>

      {faqToDelete && (
        <DeleteConfirmModal
          isOpen={faqToDelete !== null}
          onClose={() => setFaqToDelete(null)}
          onConfirm={() => handleDeleteFAQ(faqToDelete)}
          title="Delete FAQ?"
          message="Are you sure you want to delete this FAQ? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default FAQPage;