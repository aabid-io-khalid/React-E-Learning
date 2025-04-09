import { useState } from 'react';

function VideoPlayer({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!video) return null;
  
  const handlePlayPause = () => {
    const videoElement = document.getElementById(`video-${video.id}`);
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };
  
  const toggleFullscreen = () => {
    const playerContainer = document.getElementById(`player-container-${video.id}`);
    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Video Title */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-xl text-gray-800">{video.title}</h2>
      </div>
      
      {/* Video Player */}
      <div 
        id={`player-container-${video.id}`}
        className="relative bg-black aspect-video"
      >
        <video 
          id={`video-${video.id}`}
          className="w-full h-full" 
          src={video.file_path}
          poster={video.thumbnail_url || ''}
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button 
            onClick={handlePlayPause}
            className="bg-white/60 hover:bg-white/90 rounded-full p-2 transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-white/60 hover:bg-white/90 rounded-full p-2 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Video Description */}
      {video.description && (
        <div className="px-6 py-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{video.description}</p>
        </div>
      )}
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          {video.created_at && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(video.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <div>
          {video.duration && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;