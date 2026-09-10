import { useState } from 'react'
import './index.css'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault(); setLoading(true); setError('')
    try { await onLogin(username, password) } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }

  return <form className="login-form" onSubmit={submit}><div className="form-field"><label htmlFor="username">Username</label><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" /></div><div className="form-field"><label htmlFor="password">Password</label><input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /></div><label className="password-toggle"><input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} /> Show Password</label>{error && <p className="login-error">{error}</p>}<button className="primary-button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button></form>
}