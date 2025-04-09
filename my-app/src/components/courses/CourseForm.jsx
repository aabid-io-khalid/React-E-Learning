import { useState, useEffect } from 'react';
import API from '../../services/api';

function CourseForm({ initialData = null, categories = [], onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setCategoryId(initialData.category_id || '');
      setDuration(initialData.duration || '');
      setLevel(initialData.level || 'Beginner');
      setErrors({});
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Course name is required';
    if (!categoryId) newErrors.categoryId = 'Category is required';
    if (!duration || isNaN(parseInt(duration))) newErrors.duration = 'Valid duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    const payload = { 
      name, 
      description, 
      category_id: categoryId, 
      duration: parseInt(duration) || null,
      level
    }; 
    
    console.log('Submitting payload:', payload);
    
    try {
      let response;
      if (initialData) {
        response = await API.put(`/courses/${initialData.id}`, payload);
      } else {
        response = await API.post('/courses', payload);
      }
      console.log('Course form response:', response.data);
      onSuccess();
      resetForm();
    } catch (error) {
      console.error('Course form error:', error.response?.data || error.message);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategoryId('');
    setDuration('');
    setLevel('Beginner');
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {initialData ? 'Edit Course' : 'Create New Course'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="course-name" className="block text-sm font-medium text-gray-700 mb-1">
            Course Name<span className="text-red-500">*</span>
          </label>
          <input
            id="course-name"
            type="text"
            placeholder="Enter course name"
            value={name}
            onChange={e => setName(e.target.value)}
            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="course-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="course-description"
            placeholder="Enter course description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="course-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="course-category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className={`w-full px-4 py-3 border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white`}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
              {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="course-level" className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <div className="relative">
              <select
                id="course-level"
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Duration */}
        <div>
          <label htmlFor="course-duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration (hours)<span className="text-red-500">*</span>
          </label>
          <input
            id="course-duration"
            type="number"
            placeholder="Enter duration in hours"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            min="1"
            className={`w-full px-4 py-3 border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
          {onCancel && (
            <button 
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              <span>{initialData ? 'Update Course' : 'Create Course'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;