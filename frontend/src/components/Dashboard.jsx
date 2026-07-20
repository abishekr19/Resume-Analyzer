import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Target } from 'lucide-react';

const CircularProgress = ({ value }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  let color = 'var(--accent-primary)';
  if (value < 50) color = '#ef4444';
  else if (value < 80) color = '#eab308';
  else color = '#22c55e';

  return (
    <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto' }}>
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
          style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
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

const DetailItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
    <Icon size={16} color="var(--accent-primary)" />
    <span>{text || 'N/A'}</span>
  </div>
);

const Dashboard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4" style={{ minHeight: '50vh' }}>
        <h2 className="text-2xl font-bold">No analysis data found.</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const { personalDetails = {} } = data;

  return (
    <div className="animate-fade-in w-full max-w-7xl flex flex-col gap-6 m-0-auto" style={{ paddingBottom: '3rem' }}>
      <button className="btn btn-secondary self-start" onClick={() => navigate('/')}>
        <ArrowLeft size={18} /> New Analysis
      </button>

      {/* Top Header Section */}
      <div className="grid md-grid-cols-3 gap-6">
        <div className="glass-panel md-col-span-2 flex flex-col justify-center">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 font-heading">{personalDetails.name || 'Candidate Name'}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <DetailItem icon={Mail} text={personalDetails.email} />
                <DetailItem icon={Phone} text={personalDetails.phone} />
                <DetailItem icon={MapPin} text={personalDetails.location} />
              </div>
            </div>
            <User size={64} color="var(--glass-border)" opacity={0.5} />
          </div>
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Target size={18} color="var(--accent-secondary)" /> Profile Summary
            </h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {data.overallSummary || "Summary not available."}
            </p>
          </div>
        </div>

        <div className="glass-panel flex flex-col items-center justify-center">
          <h3 className="mb-4 text-xl font-semibold">Overall Match</h3>
          <CircularProgress value={data.atsScore || 0} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md-grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel">
            <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <Briefcase size={20} color="var(--accent-primary)" />
              Experience Analysis
            </h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {data.experienceAnalysis || "No experience analysis provided."}
            </p>
          </div>

          <div className="glass-panel">
            <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <GraduationCap size={20} color="var(--accent-primary)" />
              Education Check
            </h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {data.educationCheck || "No education details analyzed."}
            </p>
          </div>

          <div className="glass-panel">
            <h3 className="mb-4 text-xl font-semibold flex items-center gap-2" style={{ color: '#ef4444' }}>
              <AlertCircle size={20} color="#ef4444" />
              Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.missingKeywords?.length > 0 ? (
                data.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 border rounded-full text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                    {kw}
                  </span>
                ))
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>No critical keywords missing!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel">
            <h3 className="mb-4 text-xl font-semibold" style={{ color: 'var(--accent-primary)' }}>Skill Gap Analysis</h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {data.skillGap || "No specific skill gap identified."}
            </p>
          </div>

          <div className="glass-panel">
            <h3 className="mb-4 text-xl font-semibold">Actionable Suggestions</h3>
            <ul className="flex flex-col gap-3">
              {data.suggestions?.map((sugg, i) => (
                <li key={i} className="flex items-start gap-3 p-3 border rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: 'var(--accent-secondary)', marginTop: '4px' }}>•</span>
                  <span className="leading-relaxed">{sugg}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel">
            <h3 className="mb-4 text-xl font-semibold">Grammar & Formatting</h3>
            {data.grammarIssues?.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {data.grammarIssues.map((issue, i) => (
                  <li key={i} className="p-4 border-l-4 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: '#eab308' }}>
                    <p className="font-medium mb-1">{issue.issue}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Suggestion: {issue.suggestion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-3 p-4 border rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                <CheckCircle2 size={24} />
                <span className="font-medium">Your grammar and formatting look perfect!</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
