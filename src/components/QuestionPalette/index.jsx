import {useAssessment} from '../../context/AssessmentContext'

import './index.css'

const QuestionPalette = () => {
  const {
    questions,
    currentQuestionIndex,
    answers,
    visited,
    goToQuestion,
  } = useAssessment()

  const answered = Object.keys(answers).length
  const unvisited = questions.length - visited.size

  return (
    <aside className="question-palette-container">
      <h3>Question Palette</h3>

      <div className="question-grid">
        {questions.map((question, index) => {
          const status =
            answers[question.id] !== undefined
              ? 'answered'
              : visited.has(index)
                ? 'unanswered'
                : 'not-visited'

          return (
            <button
              key={question.id}
              type="button"
              className={`question-number ${status} ${
                currentQuestionIndex === index ? 'current' : ''
              }`}
              onClick={() => goToQuestion(index)}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      <div className="palette-legend">
        <div>
          <i className="answered" />
          Answered: {answered}
        </div>

        <div>
          <i className="unanswered" />
          Unanswered: {questions.length - answered}
        </div>

        <div>
          <i className="not-visited" />
          Not Visited: {unvisited}
        </div>
      </div>
    </aside>
  )
}

export default QuestionPalette