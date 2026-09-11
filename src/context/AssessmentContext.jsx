/* eslint-disable react-refresh/only-export-components */

import {createContext, useContext, useEffect, useState} from 'react'

const AssessmentContext = createContext(null)

const QUESTION_URL = 'https://apis.ccbp.in/assess/questions'
const DURATION = 15 * 60

const getCorrectAnswer = question => {
  if (question.correct_answer !== undefined) {
    return question.correct_answer
  }

  if (question.correct_option_id !== undefined) {
    return question.correct_option_id
  }

  const correctOption = question.options?.find(
    option => option.is_correct,
  )

  return correctOption?.id ?? correctOption?.text
}

export const AssessmentProvider = ({children}) => {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [answers, setAnswers] = useState({})
  const [visited, setVisited] = useState(new Set())
  const [secondsRemaining, setSecondsRemaining] = useState(DURATION)
  const [result, setResult] = useState(null)

  const loadQuestions = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(QUESTION_URL)

      if (!response.ok) {
        throw new Error("We couldn't load the questions.")
      }

      const data = await response.json()

      const formattedQuestions = (data.questions || []).map(
        question => ({
          id: question.id,
          typeofOption: question.options_type,
          question: question.question_text,
          options: question.options || [],
          correctAnswer: getCorrectAnswer(question),
        }),
      )

      if (!formattedQuestions.length) {
        throw new Error(
          'No questions are available right now.',
        )
      }

      setQuestions(formattedQuestions)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setVisited(new Set([0]))
      setSecondsRemaining(data.time_limit || DURATION)
      setResult(null)
    } catch (requestError) {
      setQuestions([])
      setError(
        requestError.message ||
          'Something went wrong while loading the assessment.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const startAssessment = async () => {
    if (!questions.length) {
      await loadQuestions()
    } else {
      setCurrentQuestionIndex(0)
      setAnswers({})
      setVisited(new Set([0]))
      setSecondsRemaining(DURATION)
      setResult(null)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  const selectAnswer = answer => {
    if (!currentQuestion) return

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: answer,
    }))
  }

  const goToQuestion = index => {
    if (index < 0 || index >= questions.length) return

    setCurrentQuestionIndex(index)

    setVisited(
      previous => new Set([...previous, index]),
    )
  }

  const nextQuestion = () =>
    goToQuestion(currentQuestionIndex + 1)

  const previousQuestion = () =>
    goToQuestion(currentQuestionIndex - 1)

  // Calculate result
  const submitAssessment = () => {
    let correct = 0
    let incorrect = 0
    let unattempted = 0

    questions.forEach(question => {
      const userAnswer = answers[question.id]

      if (
        userAnswer !== undefined &&
        userAnswer !== null &&
        userAnswer !== ''
      ) {
        if (
          String(userAnswer) ===
          String(question.correctAnswer)
        ) {
          correct++
        } else {
          incorrect++
        }
      } else {
        unattempted++
      }
    })

    const nextResult = {
      total: questions.length,
      attempted: correct + incorrect,
      correct,
      incorrect,
      unattempted,
      timeTaken: DURATION - secondsRemaining,
    }

    setResult(nextResult)

    return nextResult
  }

  useEffect(() => {
    if (
      !questions.length ||
      result ||
      secondsRemaining <= 0
    ) {
      return undefined
    }

    const timer = window.setInterval(
      () =>
        setSecondsRemaining(
          value => Math.max(0, value - 1),
        ),
      1000,
    )

    return () => window.clearInterval(timer)
  }, [questions.length, result, secondsRemaining])

  const value = {
    questions,
    isLoading,
    error,
    currentQuestion,
    currentQuestionIndex,
    answers,
    visited,
    secondsRemaining,
    result,
    loadQuestions,
    startAssessment,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitAssessment,
  }

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  )
}

const useAssessment = () => {
  const context = useContext(AssessmentContext)

  if (!context) {
    throw new Error(
      'useAssessment must be used inside AssessmentProvider',
    )
  }

  return context
}

export {useAssessment}