 // CategoryManagement.jsx
  import { useState, useEffect } from 'react';
  import API from '../../services/api';
  import CategoryCard from './CategoryCard';
  import CategoryForm from './CategoryForm';
  
  function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);
    
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    
    const handleEdit = (category) => {
      if (!category.id) {
        console.error('Category missing ID:', category);
        return;
      }
      setEditingCategory(category);
      setShowForm(true);
      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleDelete = async (id) => {
      if (!id) {
        console.error('No ID provided for deletion');
        return;
      }
      
      if (!confirm('Are you sure you want to delete this category?')) {
        return;
      }
      
      try {
        await API.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Delete error:', error.response?.data || error.message);
      }
    };
    
    const handleFormSuccess = () => {
      fetchCategories();
      setEditingCategory(null);
      setShowForm(false);
    };
    
    const handleFormCancel = () => {
      setEditingCategory(null);
      setShowForm(false);
    };
    
    const handleAddNew = () => {
      setEditingCategory(null);
      setShowForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    useEffect(() => {
      fetchCategories();
    }, []);
    
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Category
            </button>
          )}
        </div>
        
        {showForm && (
          <CategoryForm
            initialData={editingCategory}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="text-sm text-gray-500">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'}
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : categories.length > 0 ? (
            <div className="space-y-4">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-500">No categories available</p>
              <p className="text-gray-400 text-sm mt-2">
                Click the "Add Category" button to create your first category
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default CategoryManagement;