import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './Firebaseconfig/config';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      alert('Signup successful!');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Signup error:', error.code, error.message);
      let errorMessage = 'Signup failed, try again!';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        default:
          errorMessage = error.message || 'Signup failed, try again!';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed up with Google: ', result.user);
      alert('Signup with Google successful!');
      navigate('Carlist'); // Redirect to homepage
    } catch (error) {
      console.error('Google Sign Up error:', error.message);
      setError('Google Sign Up failed, try again!');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default Signup;
