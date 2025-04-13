import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";

import Header from "./components/Header";
import Template from './components/Template';
import Mainbody from './components/Mainbody';
import Formheader from './components/Formheader';
import CenteredTabs from './components/Tabs'; // Assuming this shows the form fields
import Question_form from './components/Question_form'; // <-- Add this import
import './App.css';

// HomePage component
function HomePage() {
  return (
    <>
      <Header />
      <Mainbody />
      <Template />
    </>
  );
}

// FormPageLayout component
function FormPageLayout() {
  // Extract params from the URL
  const { id, templateType } = useParams();
  console.log("FormPageLayout Rendered", id, templateType); // Debug log

  return (
    <>
      <Formheader />
      <CenteredTabs />
      <Question_form id={id} templateType={templateType} /> {/* Pass params to the form */}
    </>
  );
}

// AppRoutes for route management
function AppRoutes() {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form/:id/:templateType" element={<FormPageLayout />} />
    </Routes>
  );
}

// Main App Component
function App() {
  return (
    <div className="app">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
