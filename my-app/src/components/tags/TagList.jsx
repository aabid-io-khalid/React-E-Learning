import { useState, useEffect } from 'react';
import API from '../../services/api';
import TagCard from './TagCard';

function TagList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tags');
      console.log('Fetched tags:', res.data);
      setTags(Array.isArray(res.data) ? res.data : res.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    
    try {
      setIsSubmitting(true);
      const res = await API.post('/tags', { name: newTag });
      console.log('Created tag:', res.data);
      setNewTag('');
      fetchTags();
    } catch (err) {
      console.error('Create tag error:', err.response?.data || err.message);
      setError('Failed to create tag. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }
    
    try {
      await API.delete(`/tags/${id}`);
      fetchTags();
    } catch (err) {
      console.error('Delete tag error:', err.response?.data || err.message);
      setError('Failed to delete tag. Please try again.');
    }
  };

  const handleEdit = async (id, name) => {
    try {
      await API.put(`/tags/${id}`, { name });
      fetchTags();
    } catch (err) {
      console.error('Edit tag error:', err.response?.data || err.message);
      setError('Failed to update tag. Please try again.');
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const filteredTags = tags.filter(tag => 
    tag['tag name'].toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Tags</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Create New Tag</h2>
        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter tag name"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting || !newTag.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Tag'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search Tags</h2>
          <div className="text-sm text-gray-500">
            {filteredTags.length} {filteredTags.length === 1 ? 'tag' : 'tags'} found
          </div>
        </div>
        <input
          type="text"
          placeholder="Filter tags..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Tag List</h2>
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTags.length > 0 ? (
          <div>
            {filteredTags.map(tag => (
              <TagCard
                key={tag['tag id']}
                tag={tag}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">
              {filter ? 'No tags match your search' : 'No tags available'}
            </p>
            {filter && (
              <button 
                onClick={() => setFilter('')}
                className="text-blue-600 hover:text-blue-800 mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TagList;