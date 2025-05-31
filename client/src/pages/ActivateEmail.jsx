import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activateEmail } from '../features/auth/authSlice';

const ActivateEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activate = async () => {
      try {
        await dispatch(activateEmail(token)).unwrap();
        navigate('/login');
      } catch (error) {
        console.error('Activation failed:', error);
      }
    };

    activate();
  }, [dispatch, token, navigate]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Activating Your Account</h2>
        <p className="text-gray-600">Please wait while we activate your account...</p>
      </div>
    </div>
  );
};

export default ActivateEmail; 
