import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import QuestionsResults from '../QuestionsResults'

import './index.css'

const ResultPageTimeUp = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <main className="result-page time-up">
        <section>
          <div className="result-icon">
            ◷
          </div>

          <h1>Time’s Up!</h1>

          <p>
            Better luck next time. Keep practicing.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate('/')}
          >
            Reattempt
          </button>
        </section>

        <QuestionsResults />
      </main>
    </>
  )
}

export default ResultPageTimeUp