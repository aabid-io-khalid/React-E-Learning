// CategoryCard.jsx
function CategoryCard({ category, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <p className="text-gray-600 mt-1">{category.description || 'No description'}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(category)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(category.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;