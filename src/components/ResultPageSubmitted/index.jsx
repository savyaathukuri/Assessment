import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import QuestionsResults from '../QuestionsResults'
import './index.css'
const ResultPageSubmitted = () => { const navigate = useNavigate(); return <><Header /><main className="result-page submitted"><section><div className="result-icon success">✓</div><h1>Assessment Submitted!</h1><p>Great job! You have completed the assessment.</p><button className="primary-button" onClick={() => navigate('/')}>Reattempt</button></section><QuestionsResults /></main></> }
export default ResultPageSubmitted
