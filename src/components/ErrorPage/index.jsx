import {useNavigate} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const ErrorPage = ({
  message = "We couldn't load the questions.",
  onRetry,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <main className="error-page">
        <div className="error-illustration">
          ☁
          <b>×</b>
        </div>

        <h1>Oops! Something went wrong.</h1>

        <p>{message}</p>

        <button
          className="primary-button"
          onClick={
            onRetry || (() => navigate('/assessment'))
          }
        >
          Retry
        </button>
      </main>
    </>
  )
}

export default ErrorPage