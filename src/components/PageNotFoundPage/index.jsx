import {useNavigate} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const PageNotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <main className="page-not-found">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for doesn’t exist.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </main>
    </>
  )
}

export default PageNotFoundPage