import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {AssessmentProvider} from './context/AssessmentContext'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import AssessmentPage from './components/AssessmentPage'
import ResultPageTimeUp from './components/ResultPageTimeUp'
import ResultPageSubmitted from './components/ResultPageSubmitted'
import PageNotFoundPage from './components/PageNotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <AssessmentProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/assessment" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
        <Route path="/submitted" element={<ProtectedRoute><ResultPageSubmitted /></ProtectedRoute>} />
        <Route path="/timeup" element={<ProtectedRoute><ResultPageTimeUp /></ProtectedRoute>} />
        <Route path="/not-found" element={<PageNotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  </AssessmentProvider>
)

export default App;
