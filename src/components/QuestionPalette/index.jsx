import {useState} from 'react'
import './index.css'

const QuestionPalette = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1)

  const [answers, setAnswers] = useState({})

  const [visitedQuestions, setVisitedQuestions] = useState([1])

  const questions = [
    {id: 1, question: 'What is the capital of India?'},
    {id: 2, question: 'Which language is used for web development?'},
    {id: 3, question: 'What is React?'},
    {id: 4, question: 'What is JavaScript?'},
    {id: 5, question: 'What is HTML?'},
    {id: 6, question: 'What is CSS?'},
    {id: 7, question: 'What is Node.js?'},
    {id: 8, question: 'What is MongoDB?'},
    {id: 9, question: 'What is an API?'},
    {id: 10, question: 'What is REST API?'},
    {id: 11, question: 'What is Git?'},
    {id: 12, question: 'What is GitHub?'},
    {id: 13, question: 'What is SQL?'},
    {id: 14, question: 'What is Java?'},
    {id: 15, question: 'What is Python?'},
  ]

  const handleQuestionClick = questionId => {
    setCurrentQuestion(questionId)

    setVisitedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev
      }

      return [...prev, questionId]
    })
  }

  const handleAnswer = option => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: option,
    }))
  }

  const getQuestionStatus = questionId => {
    if (answers[questionId]) {
      return 'answered'
    }

    if (visitedQuestions.includes(questionId)) {
      return 'unanswered'
    }

    return 'not-visited'
  }

  return (
    <div className="question-palette-container">

      <h3>Question Palette</h3>

      <div className="question-grid">
        {questions.map(question => {
          const status = getQuestionStatus(question.id)

          return (
            <button
              key={question.id}
              type="button"
              className={`question-number ${status} ${
                currentQuestion === question.id ? 'current' : ''
              }`}
              onClick={() => handleQuestionClick(question.id)}
            >
              {question.id}
            </button>
          )
        })}
      </div>

      <div className="palette-legend">

        <div className="legend-item">
          <span className="legend-dot answered"></span>
          <span>Answered</span>
        </div>

        <div className="legend-item">
          <span className="legend-dot unanswered"></span>
          <span>Unanswered</span>
        </div>

        <div className="legend-item">
          <span className="legend-dot not-visited"></span>
          <span>Not Visited</span>
        </div>

      </div>

    </div>
  )
}

export default QuestionPalette