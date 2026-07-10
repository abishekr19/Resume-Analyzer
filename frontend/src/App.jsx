import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import UploadSection from './components/UploadSection';
import Dashboard from './components/Dashboard';
import { Upload } from 'lucide-react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <Router>
      <div className="container">
        <header style={{ marginBottom: '3rem', textAlign: 'center' }} className="animate-fade-in">
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            <span className="text-gradient">AI Resume</span> Analyzer
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            Elevate your career with AI-powered resume insights
          </p>
        </header>

        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Landing setAnalysisData={setAnalysisData} />} 
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard data={analysisData} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Landing({ setAnalysisData }) {
  const navigate = useNavigate();

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <UploadSection onComplete={handleAnalysisComplete} />
    </div>
  );
}

export default App;
