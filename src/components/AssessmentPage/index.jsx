import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import QuestionPalette from '../QuestionPalette'
import SingleSelectOptions from '../SingleSelectOptions'
import ImageOption from '../ImageOption'
import DefaultOption from '../DefaultOption'
import ErrorPage from '../ErrorPage'

import {useAssessment} from '../../context/AssessmentContext'

import './index.css'

const QuestionRenderer = () => {
  const {currentQuestion} = useAssessment()

  if (currentQuestion.typeofOption === 'SINGLE_SELECT') {
    return <SingleSelectOptions />
  }

  if (currentQuestion.typeofOption.includes('IMAGE')) {
    return <ImageOption />
  }

  return <DefaultOption />
}

const AssessmentPage = () => {
  const navigate = useNavigate()

  const {
    questions,
    isLoading,
    error,
    currentQuestion,
    currentQuestionIndex,
    previousQuestion,
    nextQuestion,
    submitAssessment,
    secondsRemaining,
    loadQuestions,
  } = useAssessment()

  useEffect(() => {
    if (!questions.length && !isLoading && !error) {
      loadQuestions()
    }
  }, [questions.length, isLoading, error, loadQuestions])

  useEffect(() => {
    if (questions.length && secondsRemaining === 0) {
      submitAssessment()
      navigate('/timeup', {replace: true})
    }
  }, [
    secondsRemaining,
    questions.length,
    submitAssessment,
    navigate,
  ])

  if (isLoading || (!questions.length && !error)) {
    return (
      <>
        <Header showTimer />

        <div className="loading-screen">
          <div className="spinner" />
          <p>Loading questions…</p>
        </div>
      </>
    )
  }

  if (error) {
    return <ErrorPage message={error} onRetry={loadQuestions} />
  }

  const last = currentQuestionIndex === questions.length - 1

  const finish = () => {
    submitAssessment()
    navigate('/submitted')
  }

  return (
    <>
      <Header showTimer />

      <main className="assessment-page">
        <section className="question-section">
          <p className="question-count">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>

          <h1>{currentQuestion.question}</h1>

          <QuestionRenderer />

          <div className="navigation-buttons">
            <button
              className="secondary-button"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            {last ? (
              <button
                className="primary-button"
                onClick={finish}
              >
                Submit Assessment
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={nextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </section>

        <QuestionPalette />
      </main>
    </>
  )
}

export default AssessmentPage
