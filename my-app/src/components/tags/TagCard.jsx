import { useState } from 'react';

function TagCard({ tag, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(tag['tag name'] || '');
  const [isHovered, setIsHovered] = useState(false);

  console.log('TagCard received tag:', tag); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(tag['tag id'], editedName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(tag['tag name'] || '');
    setIsEditing(false);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow ${isHovered ? 'shadow-md' : ''} transition-shadow p-4 mb-3 border border-gray-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            autoFocus
          />
          <div className="flex space-x-2">
            <button 
              type="submit"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <h3 className="font-medium text-gray-800">{tag['tag name'] || 'Unnamed Tag'}</h3>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(tag['tag id'])}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TagCard;