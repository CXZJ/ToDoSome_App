import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to ToDoSome</h1>
      <p className="text-xl text-gray-600 mb-8">
        Your personal task management solution
      </p>
      
      {isAuthenticated ? (
        <div className="space-x-4">
          <Link
            to="/todos"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Go to Todos
          </Link>
          <Link
            to="/profile"
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            View Profile
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home; 
