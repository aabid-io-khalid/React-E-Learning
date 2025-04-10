import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import VideoList from '../components/videos/VideoList';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState({ title: '', description: '', video_file: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/courses/${id}`);
        console.log('Fetched course:', res.data);
        setCourse(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/courses/${id}/videos`, videoData);
      console.log('Video added:', res.data);
      setVideoData({ title: '', description: '', video_file: '' });
      setIsFormVisible(false);
      // VideoList will auto-refresh due to its own fetch
    } catch (err) {
      console.error('Add video error:', err.response?.data || err.message);
    }
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-slate-50 pt-12">
      <div className="max-w-6xl mx-auto px-4">
        <Loader />
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-slate-50 pt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-2xl text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Error Loading Course</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/courses')}
            className="mt-6 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            Return to Courses
          </button>
        </div>
      </div>
    </div>
  );
  
  if (!course) return (
    <div className="min-h-screen bg-slate-50 pt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-50 border border-gray-200 px-6 py-8 rounded-2xl text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M12 14a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Course Not Found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/courses')}
            className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white overflow-hidden pt-16 pb-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
        <div className="absolute -bottom-16 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <button 
            onClick={() => navigate('/courses')} 
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Courses
          </button>
          
          <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {course.category_name && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {course.category_name}
              </span>
            )}
            {course.level && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {course.level} Level
              </span>
            )}
            {course.duration && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration} hours
              </span>
            )}
            {course.price ? (
              <span className="px-4 py-1 bg-white text-indigo-700 rounded-full text-sm font-bold">
                ${course.price}
              </span>
            ) : (
              <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                Free
              </span>
            )}
          </div>
          
          <p className="text-xl opacity-90 font-light max-w-2xl">
            {course.description || 'No description available'}
          </p>
        </div>
        
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-16">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#f8fafc" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#f8fafc" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'videos' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Course Videos
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === 'details' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Additional Details
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Course Overview
            </h2>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">{course.description || 'No detailed description available for this course.'}</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {['Key concepts', 'Practical applications', 'Industry best practices', 'Problem-solving techniques'].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Prerequisites</h3>
              <p className="text-gray-700">No special prerequisites are required for this course.</p>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                Course Videos
              </h2>
              <button 
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Video
              </button>
            </div>
            
            {/* Add Video Form */}
            {isFormVisible && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Video</h3>
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Video Title*
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Enter video title"
                      value={videoData.title}
                      onChange={e => setVideoData({ ...videoData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Enter video description"
                      value={videoData.description}
                      onChange={e => setVideoData({ ...videoData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="video_file" className="block text-sm font-medium text-gray-700 mb-1">
                      Video URL*
                    </label>
                    <input
                      id="video_file"
                      type="url"
                      placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
                      value={videoData.video_file}
                      onChange={e => setVideoData({ ...videoData, video_file: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsFormVisible(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                    >
                      Add Video
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Video List */}
            <VideoList courseId={id} />
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Course Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Category</h3>
                <p className="text-gray-900 font-medium">{course.category_name || 'Not categorized'}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Difficulty Level</h3>
                <p className="text-gray-900 font-medium">{course.level || 'Not specified'}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Total Duration</h3>
                <p className="text-gray-900 font-medium">{course.duration} hours</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Status</h3>
                <div>
                  {course.status === 'published' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  ) : course.status === 'draft' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Draft
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {course.status || 'Not specified'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Price</h3>
                <p className="text-gray-900 font-medium">
                  {course.price ? `$${course.price}` : 'Free'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm uppercase text-gray-500 font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags && course.tags.length > 0 ? (
                    course.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;