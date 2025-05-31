import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../features/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p>Loading profile information...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p>No user information available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Personal ID</label>
            <p className="mt-1 text-gray-900">{user.personal_id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <p className="mt-1 text-gray-900">{user.address}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <p className="mt-1 text-gray-900">{user.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
