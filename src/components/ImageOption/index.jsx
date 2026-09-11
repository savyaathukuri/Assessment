import {useAssessment} from '../../context/AssessmentContext'
import './index.css'
const ImageOption = () => { const {currentQuestion, answers, selectAnswer} = useAssessment(); const selected = answers[currentQuestion.id]; return <div className="image-option">{currentQuestion.options.map(option => <button type="button" key={option.id} className={`image-option-container ${selected === option.id ? 'selected' : ''}`} onClick={() => selectAnswer(option.id)}><img src={option.image_url} alt={option.text} /><span>{option.text}</span>{selected === option.id && <b>✓</b>}</button>)}</div> }
export default ImageOption
