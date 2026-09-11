import {useState} from 'react'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  if (localStorage.getItem('jwt_token')) {
    return <Navigate to="/" replace />
  }

  const submit = async event => {
    event.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Enter your username and password')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      // A misconfigured deployment can return an HTML error page. Avoid hiding
      // the useful HTTP error behind a JSON parsing exception.
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error_msg || 'Invalid username or password')
      }

      if (!data.jwt_token) {
        throw new Error(
          'Login succeeded but no session token was returned',
        )
      }

      localStorage.setItem('jwt_token', data.jwt_token)

      navigate(location.state?.from || '/', {
        replace: true,
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-panel" onSubmit={submit}>
        <div className="login-brand">
          <span>✓</span> Nxt Assess
        </div>

        <h1>Welcome Back!</h1>

        <p>Sign in to continue to your assessment</p>

        <label>
          Username
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Enter your username"
          />
        </label>

        <label>
          Password
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </label>

        <label className="password-toggle">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={event => setShowPassword(event.target.checked)}
          />
          Show Password
        </label>

        {error && <p className="login-error">ⓘ {error}</p>}

        <button className="primary-button" disabled={loading}>
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <div className="login-art">
        ▣
        <span>☑</span>

        <p>
          Assess your skills
          <br />
          with confidence.
        </p>
      </div>
    </main>
  )
}

export default LoginForm
