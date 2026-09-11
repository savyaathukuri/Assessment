import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import {useAssessment} from '../../context/AssessmentContext'
import './index.css'
const Dashboard = () => {
  const navigate = useNavigate(); const {isLoading, startAssessment, questions} = useAssessment()
  const start = async () => { await startAssessment(); navigate('/assessment') }
  return <><Header /><main className="dashboard"><section className="welcome"><div><h1>Hello, Candidate 👋</h1><p>Welcome to Nxt Assess. Take the assessment to<br />evaluate your skills.</p></div><div className="dashboard-art" aria-hidden="true">☑<span>⏱</span></div></section><section className="assessment-card"><div className="stat-grid"><div><b>▣</b><small>Total Questions</small><strong>{questions.length || 15}</strong></div><div><b>◷</b><small>Duration</small><strong>15 Minutes</strong></div><div><b>♙</b><small>Total Marks</small><strong>{questions.length || 15}</strong></div></div><button className="primary-button" onClick={start} disabled={isLoading}>{isLoading ? 'Loading assessment…' : '▶  Start Assessment'}</button></section></main></>
}
export default Dashboard
