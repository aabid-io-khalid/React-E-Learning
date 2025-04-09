import { useNavigate } from 'react-router-dom';

function CourseCard({ course, onDelete, onEdit }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };
  
  const getCategoryColor = (categoryName) => {
    if (!categoryName) return { bg: 'bg-gray-100', text: 'text-gray-800' };
    
    const nameHash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const colors = [
      { bg: 'bg-blue-100', text: 'text-blue-800' },
      { bg: 'bg-indigo-100', text: 'text-indigo-800' },
      { bg: 'bg-purple-100', text: 'text-purple-800' },
      { bg: 'bg-green-100', text: 'text-green-800' },
      { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      { bg: 'bg-red-100', text: 'text-red-800' },
      { bg: 'bg-pink-100', text: 'text-pink-800' },
      { bg: 'bg-teal-100', text: 'text-teal-800' },
    ];
    
    return colors[nameHash % colors.length];
  };
  
  const categoryColor = getCategoryColor(course.category_name);

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <span className={`${categoryColor.bg} ${categoryColor.text} text-xs font-medium px-3 py-1 rounded-full`}>
              {course.category_name || 'Uncategorized'}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration} hours
            </div>
          </div>
          
          {/* Course title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{course.name}</h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">{course.description}</p>
          
          {/* Learn more link */}
          <div className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors mt-2">
            Learn more →
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(course);
          }}
          className="px-4 py-2 bg-white border border-gray-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(course.id);
          }}
          className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseCard;