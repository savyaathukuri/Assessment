import QuestionsResults from '../QuestionsResults';
const  ResultPageTimeUp = () => {
    return (
        <div className="result-page-time-up">
            <h1>Time's Up!</h1>
            <p>Better Luck next time.Keep practicing!</p>
            <button className="primary-button">Reattempt</button>
            <QuestionsResults/>
        </div>
    );
}

export default ResultPageTimeUp;