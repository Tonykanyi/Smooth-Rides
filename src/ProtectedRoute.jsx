import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
