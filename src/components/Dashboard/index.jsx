import {useNavigate} from "react-router-dom";
import Header from "../Header";
const Dashboard = () => {
    const navigate = useNavigate();
  const startAssesment = () => {
    navigate("/assessment");
  };

  return (
    <div>
        <Header />
      <h1>Hello Candidate</h1>
      <p>Welcome to Nxt Assess. Take the assessment to evaluate your skills.</p>
      <button className = "primary-button" onClick={startAssesment}>Start Assessment</button>
    </div>
  );
};

export default Dashboard;