import React from "react";
import { useState , useEffect } from "react";
import QuestionPalette from "../QuestionPalette";
import Header from "../Header";
import SingleSelectOptions from "../SingleSelectOptions";



const AssessmentPage = () => {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];


  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('https://apis.ccbp.in/assess/questions');
      const data = await response.json();
      const formattedQuestions = data.questions.map((question) => ({
        id: question.id,
        typeofOption: question.options_type,
        Question: question.question_text,
        setofOptions: question.options,
      }));
      console.log(formattedQuestions);
      setQuestions(formattedQuestions);
      setIsLoading(false);
    }
    fetchQuestions();
  }, []);

  if(isLoading) {
    return <p>Loading...</p>
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };


  const renderOptions = () => {
    if(currentQuestion.typeofOption === "single") {
      return (
         <SingleSelectOptions
        options={currentQuestion.setofOptions}
      />
    )
  }
}

  return (
    <div className="assessment-page">
     <Header />
      <div className="assessment-content">
        <div className="question-section">
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <h2>
            {currentQuestion?.Question}
          </h2>
          {/* <div className="options">
            <button>A &nbsp; New Delhi</button>
            <button>B &nbsp; Mumbai</button>
            <button>C &nbsp; Kolkata</button>
            <button>D &nbsp; Chennai</button>
          </div> */}

            {renderOptions()}
           <button  
            className="previous-button"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >Previous</button>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >Next Question
          </button>
        </div>
        <QuestionPalette />
      </div>
    </div>
  );
}

export default AssessmentPage