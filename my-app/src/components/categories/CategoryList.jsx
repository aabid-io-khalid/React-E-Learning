  // CategoryList.jsx
  import { useEffect, useState } from 'react';
  import API from '../../services/api'; 
  
  function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      setLoading(true);
      API.get('/categories')
        .then(response => {
          setCategories(response.data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
          setError(error.message);
          setCategories([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
    
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700">Error: {error}</p>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800">{category.name}</h3>
                {category.description && <p className="text-gray-600 text-sm mt-1">{category.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded text-center">
            <p className="text-gray-500">No categories available</p>
          </div>
        )}
      </div>
    );
  }
  
  export default CategoryList;