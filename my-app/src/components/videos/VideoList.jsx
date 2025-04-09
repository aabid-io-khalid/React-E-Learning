import { useState, useEffect } from 'react';
import API from '../../services/api';
import VideoPlayer from './VideoPlayer';

function VideoList({ courseId }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/courses/${courseId}/videos`);
      console.log('Fetched videos:', res.data);
      const fetchedVideos = res.data.videos || [];
      setVideos(fetchedVideos);
      
      if (fetchedVideos.length > 0 && !activeVideo) {
        setActiveVideo(fetchedVideos[0].id);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }
    
    try {
      await API.delete(`/videos/${videoId}`);
      fetchVideos(); 
    } catch (err) {
      console.error('Delete video error:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [courseId]);

  const Loader = () => (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-opacity-50"></div>
    </div>
  );

  if (loading) return <Loader />;
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      <p className="font-medium">Error: {error}</p>
    </div>
  );
  
  if (videos.length === 0) return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <p className="text-gray-600">No videos available for this course.</p>
      <p className="text-gray-500 text-sm mt-2">Add a video using the form above to get started.</p>
    </div>
  );

  const selectedVideo = videos.find(v => v.id === activeVideo) || videos[0];

  return (
    <div>
      <div className="mb-8">
        <VideoPlayer video={selectedVideo} />
      </div>
      
      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Course Content ({videos.length} {videos.length === 1 ? 'video' : 'videos'})
      </h3>
      
      <div className="space-y-3">
        {videos.map((video, index) => (
          <div 
            key={video.id} 
            className={`border ${activeVideo === video.id ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50'} rounded-lg p-4 transition-all duration-200 cursor-pointer flex justify-between items-center`}
            onClick={() => setActiveVideo(video.id)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold mr-3">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{video.title}</h4>
                {video.description && (
                  <p className="text-gray-500 text-sm line-clamp-1 mt-1">{video.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {video.duration ? `${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, '0')}` : '--:--'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(video.id);
                }}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                title="Delete video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;