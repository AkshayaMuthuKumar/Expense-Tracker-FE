import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MessageModal from './MessageModel'; // Import the MessageModal component

function Auth({ setUser }) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5000/signup', { username, email, password });
      setModalTitle('Sign Up Successful');
      setMessage('User created successfully');
      setShowModal(true);
      setIsSigningUp(false);
    } catch (error) {
      setModalTitle('Sign Up Error');
      setMessage(error.response?.data?.error || 'An error occurred during signup');
      setShowModal(true);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post('http://localhost:5000/signin', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser({ name: res.data.username }); // Assume the response includes the username
      setModalTitle('Sign In Successful');
      setMessage('Signed in successfully');
      setShowModal(true);
      navigate('/dashboard');
    } catch (error) {
      setModalTitle('Sign In Error');
      setMessage(error.response?.data?.message || 'An error occurred during signin');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {isSigningUp ? (
            <div className="card mt-5">
              <div className="card-body">
                <h1 className="card-title">Sign Up</h1>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleSignUp} className="btn btn-primary btn-block">Sign Up</button>
                <button onClick={() => setIsSigningUp(false)} className="btn btn-link btn-block">Back to Sign In</button>
              </div>
            </div>
          ) : (
            <div className="card mt-5">
              <div className="card-body">
                <h1 className="card-title">Sign In</h1>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleSignIn} className="btn btn-primary btn-block">Sign In</button>
                <button onClick={() => setIsSigningUp(true)} className="btn btn-link btn-block">Go to Sign Up</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <MessageModal
        show={showModal}
        handleClose={handleCloseModal}
        title={modalTitle}
        message={message}
      />
    </div>
  );
}

export default Auth;
