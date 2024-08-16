import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './Firebaseconfig/config';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in: ', userCredential.user);
      alert('Login successful!');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Login failed, try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User logged in with Google: ', result.user);
      alert('Login with Google successful!');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Google Sign In error:', error.message);
      setError('Google Sign In failed, try again!');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="w-full">
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
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
