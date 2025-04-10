import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Stats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    courses: null,
    categories: null,
    tags: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courseRes, categoryRes, tagRes] = await Promise.all([
          API.get('/stats/courses'),
          API.get('/stats/categories'),
          API.get('/stats/tags'),
        ]);

        console.log('Course stats:', courseRes.data);
        console.log('Category stats:', categoryRes.data);
        console.log('Tag stats:', tagRes.data);

        setStats({
          courses: courseRes.data,
          categories: categoryRes.data,
          tags: tagRes.data,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const calculatePercentage = (level, total) => {
    if (!stats.courses || !total) return 0;
    return Math.round((stats.courses[`${level}_courses`] / total) * 100);
  };

  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      <p className="mt-4 text-indigo-600 font-medium">Loading statistics...</p>
    </div>
  );

  const ErrorDisplay = ({ message }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Error Loading Statistics</h2>
        <p className="text-gray-600 text-center">{message}</p>
        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white mb-8 hover:text-blue-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-2">Learning Platform Statistics</h1>
          <p className="text-xl opacity-90">Insights and metrics about our courses and content</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.courses && (
            <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-indigo-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.courses.total_courses}</h3>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {stats.categories && (
            <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Categories</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.categories.total_categories}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {stats.tags && (
            <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Tags</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.tags.total_tags}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Statistics */}
          {stats.courses && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Course Statistics</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <p className="text-sm text-indigo-600 font-medium">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.courses.total_courses}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-medium">Active Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.courses.total_courses}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-4">Course Level Distribution</h3>
                
                {/* Course Level Progress Bars */}
                <div className="space-y-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => {
                    const count = stats.courses[`${level}_courses`];
                    const percentage = calculatePercentage(level, stats.courses.total_courses);
                    
                    return (
                      <div key={level}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{level}</span>
                          <span className="text-sm font-medium text-gray-700">{count} courses ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              level === 'Beginner' ? 'bg-blue-600' : 
                              level === 'Intermediate' ? 'bg-indigo-600' : 'bg-purple-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Category & Tag Statistics */}
          <div className="space-y-8">
            {/* Category Statistics */}
            {stats.categories && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-4 px-6">
                  <h2 className="text-xl font-bold text-white">Category Statistics</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-purple-600 font-medium">Total Categories</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.categories.total_categories}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-purple-600 font-medium">With Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.categories.categories_with_courses}</p>
                    </div>
                  </div>
                  
                  {/* Usage percentage */}
                  {stats.categories.total_categories > 0 && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Category Usage</span>
                        <span className="text-sm font-medium text-gray-700">
                          {Math.round((stats.categories.categories_with_courses / stats.categories.total_categories) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-purple-600"
                          style={{ width: `${Math.round((stats.categories.categories_with_courses / stats.categories.total_categories) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tag Statistics */}
            {stats.tags && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-4 px-6">
                  <h2 className="text-xl font-bold text-white">Tag Statistics</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-blue-600 font-medium">Total Tags</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.tags.total_tags}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-blue-600 font-medium">Tags With Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.tags.tags_with_courses}</p>
                    </div>
                  </div>
                  
                  {stats.tags.total_tags > 0 && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Tag Usage</span>
                        <span className="text-sm font-medium text-gray-700">
                          {Math.round((stats.tags.tags_with_courses / stats.tags.total_tags) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-blue-600"
                          style={{ width: `${Math.round((stats.tags.tags_with_courses / stats.tags.total_tags) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Looking for more insights?</h3>
          <p className="text-gray-600 mb-6">Explore our detailed analytics dashboard for deeper insights into your learning platform.</p>
          <button 
            onClick={() => navigate('/courses')} 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
          >
            Browse Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stats;