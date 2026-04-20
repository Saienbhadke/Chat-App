import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    // TODO: Replace with real auth (e.g. Firebase signInWithEmailAndPassword)
    setTimeout(() => {
      setLoading(false)
      navigate('/home')
    }, 1200)
  }

  return (
    <div className="login-root">
      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-card">
          {/* Logo / Brand */}
          <div className="login-brand">
            <span className="brand-icon">�</span>
            <h1 className="brand-name">GO-Chat</h1>
            <p className="brand-tagline">Real-time conversations, redefined.</p>
          </div>

          {error && <Alert variant="danger" className="login-alert">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-4">
              <Form.Label className="field-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="field-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-input"
              />
            </Form.Group>

            <div className="d-flex justify-content-end mb-4">
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <Button
              type="submit"
              className="login-btn w-100"
              disabled={loading}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </Form>

          <div className="divider"><span>or</span></div>

          <Button className="google-btn w-100">
            <svg width="18" height="18" viewBox="0 0 48 48" className="me-2">
              <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.3 3.1 29.5 1 24 1 14.8 1 7 6.7 3.7 14.7l7 5.4C12.5 13.5 17.8 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"/>
              <path fill="#FBBC05" d="M10.7 28.9C10.3 27.6 10 26.3 10 25s.3-2.6.7-3.9l-7-5.4C2.6 18.3 2 21.6 2 25s.6 6.7 1.7 9.3l7-5.4z"/>
              <path fill="#34A853" d="M24 49c5.5 0 10.1-1.8 13.5-4.9l-7.4-5.7c-1.8 1.2-4.2 2-6.1 2-6.2 0-11.5-4-13.3-9.5l-7 5.4C7 43.3 14.8 49 24 49z"/>
            </svg>
            Continue with Google
          </Button>

          <p className="signup-text">
            Don't have an account? <Link to="/register" className="signup-link">Create one</Link>
          </p>
        </div>
      </Container>
    </div>
  )
}

export default LoginPage
