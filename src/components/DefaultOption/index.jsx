import {useAssessment} from '../../context/AssessmentContext'

import './index.css'

const DefaultOption = () => {
  const {
    currentQuestion,
    answers,
    selectAnswer,
  } = useAssessment()

  const selected = answers[currentQuestion.id]

  return (
    <div className="default-options">
      {currentQuestion.options.map((option, index) => (
        <button
          type="button"
          key={option.id}
          className={`option-button ${
            selected === option.id ? 'selected' : ''
          }`}
          onClick={() => selectAnswer(option.id)}
        >
          <span>{String.fromCharCode(65 + index)}</span>

          {option.text}

          {selected === option.id && <b>✓</b>}
        </button>
      ))}
    </div>
  )
}

export default DefaultOption
