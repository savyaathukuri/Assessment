import React from "react";
import { useState , useEffect } from "react";
import QuestionPalette from "../QuestionPalette";
import Header from "../Header";
const AssessmentPage = () => {

  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true);

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
  
  return (
    <div className="assessment-page">
     <Header />
      <div className="assessment-content">
        <div className="question-section">
          <p>Question 1 of 15</p>
          <h2>
            What is the capital of India?
          </h2>
          <div className="options">
            <button>A &nbsp; New Delhi</button>
            <button>B &nbsp; Mumbai</button>
            <button>C &nbsp; Kolkata</button>
            <button>D &nbsp; Chennai</button>
          </div>
          <button className="next-button">
            Next Question
          </button>
        </div>
        <QuestionPalette />
      </div>
    </div>
  );
}

export default AssessmentPage;