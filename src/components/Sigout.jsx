import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
