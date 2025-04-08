  // CategoryForm.jsx
  import { useState, useEffect } from 'react';
  import API from '../../services/api';
  
  function CategoryForm({ initialData = null, onSuccess, onCancel }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
      if (initialData) {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
      } else {
        setName('');
        setDescription('');
      }
    }, [initialData]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { name, description };
      
      try {
        if (initialData) {
          if (!initialData.id) {
            throw new Error('No valid category ID provided for update');
          }
          const response = await API.put(`/categories/${initialData.id}`, payload);
          console.log('Update response:', response.data);
        } else {
          const response = await API.post(`/categories`, payload);
          console.log('Create response:', response.data);
        }
        onSuccess();
        setName('');
        setDescription('');
      } catch (error) {
        console.error('Form submit error:', error.response?.data || error.message);
      }
    };
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Category' : 'Create Category'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
            title="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Category name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Category description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={initialData && !initialData.id}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default CategoryForm;