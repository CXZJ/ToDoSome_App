import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activateEmail } from '../store/slices/authSlice';

const ActivateEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activate = async () => {
      if (!token) {
        setError('No activation token provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await dispatch(activateEmail({ activation_token: token })).unwrap();
        console.log('Activation successful:', result);
        navigate('/login');
      } catch (error) {
        console.error('Activation failed:', error);
        setError(error.message || 'Activation failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    activate();
  }, [dispatch, token, navigate]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Activating Your Account</h2>
        {loading ? (
          <p className="text-gray-600">Please wait while we activate your account...</p>
        ) : error ? (
          <div>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Register
            </button>
          </div>
        ) : (
          <p className="text-green-600">Account activated successfully! Redirecting to login...</p>
        )}
      </div>
    </div>
  );
};

export default ActivateEmail; 
