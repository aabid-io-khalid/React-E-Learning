import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../services/api';

function Home() {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          API.get('/courses?limit=4'),  
          API.get('/categories')
        ]);
        
        setFeaturedCourses(coursesRes.data.data || coursesRes.data);
        setCategories(categoriesRes.data.slice(0, 6)); 
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const goTo = (path) => () => navigate(path);

  const Loader = () => (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
        <div className="absolute -bottom-16 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Unlock Your <span className="text-blue-300">Learning</span> Potential
            </h1>
            <p className="text-xl mb-8 opacity-90 font-light">
              Access expert-led courses designed to accelerate your growth and transform your career path.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={goTo('/courses')}
                className="bg-white text-indigo-800 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Discover Courses
              </button>
              <button 
                onClick={goTo('/categories')}
                className="bg-transparent backdrop-blur-sm bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Browse Categories
              </button>
              <button 
                onClick={goTo('/tags')}
                className="bg-transparent backdrop-blur-sm bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Browse Tags
              </button>
              <button 
                onClick={goTo('/stats')}
                className="bg-transparent backdrop-blur-sm bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Browse Statistcs
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-24">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#f8fafc" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#f8fafc" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '500+', subtitle: 'Expert-led courses', icon: '🎓' },
            { title: '20k+', subtitle: 'Active learners', icon: '👨‍💻' },
            { title: '96%', subtitle: 'Completion rate', icon: '📈' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-2xl">{stat.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.title}</h3>
                  <p className="text-gray-600">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-gray-600 mt-2">Top-rated courses curated for you</p>
          </div>
          <button 
            onClick={goTo('/courses')}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center group"
          >
            View All 
            <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={goTo(`/courses/${course.id}`)}
              >
                <div className="h-40 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
                    <span className="text-4xl">{course.category_name?.[0] || '📚'}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full mb-3">
                    {course.category_name || 'Course'}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">{course.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{course.description}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration} hours
                    </span>
                    <span className="text-indigo-600 font-medium text-sm">Explore →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500">No featured courses available at the moment</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Learning Paths</h2>
              <p className="text-gray-600 mt-2">Explore categories tailored to your interests</p>
            </div>
            <button 
              onClick={goTo('/categories')}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center group"
            >
              All Categories 
              <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <div 
                  key={category.id} 
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-start"
                  onClick={goTo(`/categories/${category.id}`)}
                >
                  <div className="bg-indigo-100 rounded-xl p-3 mr-4 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
                    )}
                    <div className="mt-4 text-sm font-medium text-indigo-600">
                      Explore Path →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-gray-500">No categories available</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from learners who have transformed their skills with our courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "9bo3at L9ach",
              role: "Software Developer",
              text: "The course structure and quality of content exceeded my expectations. I was able to apply what I learned immediately in my job."
            },
            {
              name: "l9oraidids",
              role: "UX Designer",
              text: "These courses helped me transition careers. The practical projects gave me confidence to apply for positions I wouldn't have considered before."
            },
            {
              name: "mol charjam",
              role: "Data Scientist",
              text: "The community support alongside the course materials made a huge difference. I never felt stuck on a problem for too long."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full opacity-10 -ml-10 -mb-10"></div>
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your skills?</h2>
            <p className="text-xl opacity-90 mb-8 font-light">
              Join our learning community today and take the first step toward mastering new skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={goTo('/courses')}
                className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Start Learning Today
              </button>
              <button 
                onClick={goTo('/stats')}
                className="bg-transparent backdrop-blur-sm bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                View Learning Stats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;