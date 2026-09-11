import {useNavigate} from 'react-router-dom'

import {useAssessment} from '../../context/AssessmentContext'
import {formatTime} from '../../utils/time'

import './index.css'

const Header = ({showTimer = false}) => {
  const navigate = useNavigate()

  const {secondsRemaining} = useAssessment()

  const logout = () => {
    localStorage.removeItem('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="assessment-header">
      <button
        className="brand"
        onClick={() => navigate('/')}
      >
        <span>✓</span>
        Nxt Assess
      </button>

      <div className="header-actions">
        {showTimer && (
          <span className="timer">
            ◷ {formatTime(secondsRemaining)}
          </span>
        )}

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header