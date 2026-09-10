import React from "react";
import Login from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AssessmentPage from "./components/AssessmentPage";
import PageNotFoundPage from "./components/PageNotFoundPage";
import ResultPageTimeUp from "./components/ResultPageTimeUp";
import ResultPageSubmitted from "./components/ResultPageSubmitted";

import {BrowserRouter , Routes, Route} from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path = "/timeup" element={<ResultPageTimeUp />} />
      <Route path = "/submitted" element={<ResultPageSubmitted />} />
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  </BrowserRouter>
)

export default App;