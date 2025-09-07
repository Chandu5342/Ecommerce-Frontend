import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        name: form.username,
        email: form.email,
        password: form.password,
      });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4 fw-bold text-dark">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="form-control rounded-3"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control rounded-3"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control rounded-3"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100 rounded-3 fw-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <a href="/login" className="text-decoration-none fw-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
