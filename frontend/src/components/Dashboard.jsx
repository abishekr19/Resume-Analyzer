import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const CircularProgress = ({ value }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  let color = 'var(--accent-primary)';
  if (value < 50) color = '#ef4444';
  else if (value < 80) color = '#eab308';
  else color = '#22c55e';

  return (
    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="var(--glass-border)"
          strokeWidth="12"
        />
        <circle
          className="progress-ring__circle"
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
          {value}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ATS Score</span>
      </div>
    </div>
  );
};

const Dashboard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h2>No analysis data found.</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div className="flex flex-col gap-6">
        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="glass-panel flex flex-col items-center">
          <h3 style={{ marginBottom: '1rem' }}>Overall Score</h3>
          <CircularProgress value={data.atsScore} />
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={20} color="var(--accent-secondary)" />
            Missing Keywords
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.missingKeywords?.length > 0 ? (
              data.missingKeywords.map((kw, i) => (
                <span key={i} style={{ 
                  padding: '6px 12px', 
                  background: 'rgba(239, 68, 68, 0.15)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '16px',
                  fontSize: '0.9rem',
                  color: '#fca5a5'
                }}>
                  {kw}
                </span>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No critical keywords missing!</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Skill Gap Analysis</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: '1.8' }}>
            {data.skillGap || "No specific skill gap identified."}
          </p>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem' }}>Grammar & Formatting</h3>
          {data.grammarIssues?.length > 0 ? (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.grammarIssues.map((issue, i) => (
                <li key={i} style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                  <p style={{ fontWeight: '500', marginBottom: '4px' }}>{issue.issue}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Suggestion: {issue.suggestion}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 color="#22c55e" />
              <span>Your grammar and formatting look great!</span>
            </div>
          )}
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem' }}>Actionable Suggestions</h3>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.suggestions?.map((sugg, i) => (
              <li key={i} style={{ lineHeight: '1.6' }}>{sugg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
