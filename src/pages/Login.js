import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, 'users', username); // Assuming 'username' is the doc ID

      const userDocSnap = await getDoc(userDocRef);
      console.log('dta', userDocSnap.data());
      if (userDocSnap.exists() && userDocSnap.data().password === password) {
        // Setting user information in localStorage
        localStorage.setItem('user', JSON.stringify(userDocSnap.data()));

        navigate(
          userDocSnap.data().user_type === 'admin'
            ? '/adminDashboard'
            : '/officerDashboard',
        );
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Error signing in');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div>{error}</div>}
      </form>
      <button
        onClick={() => {
          navigate('adminDashboard');
        }}
        type="submit"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
