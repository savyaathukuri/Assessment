import React from 'react';
import QuestionsResults from '../QuestionsResults';
const ResultPageSubmitted = () => {
    return (
        <div className="result-page-submitted">
            <h1>Assessment Submitted!</h1>
            <p>Thank you for completing the assessment. Your results will be evaluated and shared with you shortly.</p>
            <button className="primary-button">Go to Dashboard</button>
            <QuestionsResults/>
        </div>
    );
}

export default ResultPageSubmitted;