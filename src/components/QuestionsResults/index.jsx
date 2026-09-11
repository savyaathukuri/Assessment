import {useAssessment} from '../../context/AssessmentContext'
import {formatTime} from '../../utils/time'

import './index.css'

const QuestionsResults = () => {
  const {
    result,
    questions,
    secondsRemaining,
  } = useAssessment()

  const score = result?.correct ?? 0
  const total = result?.total ?? questions.length
  const time = result?.timeTaken ?? 900 - secondsRemaining

  return (
    <div className="result-stats">
      <div>
        <small>Your Score</small>
        <strong>
          {score} / {total}
        </strong>
        <span>🏆</span>
      </div>

      <div>
        <small>Time Taken</small>
        <strong>{formatTime(time)}</strong>
        <span>⏱</span>
      </div>
    </div>
  )
}

export default QuestionsResults