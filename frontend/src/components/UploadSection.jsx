import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Loader2, Target } from 'lucide-react';
import { analyzeResume } from '../services/api';

const UploadSection = ({ onComplete }) => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await analyzeResume(file, jobDesc);
      onComplete(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '800px' }}>
      <div 
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
          borderRadius: '12px',
          padding: '4rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: isDragging ? 'rgba(123, 66, 246, 0.1)' : 'transparent',
          marginBottom: '2rem'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          accept="application/pdf" 
          style={{ display: 'none' }} 
        />
        
        {file ? (
          <div className="flex flex-col items-center gap-4">
            <FileText size={48} color="var(--accent-primary)" />
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>{file.name}</p>
            <p style={{ color: 'var(--text-secondary)' }}>Click or drag to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <UploadCloud size={64} color="var(--text-secondary)" />
            <h3 style={{ fontSize: '1.5rem' }}>Drag & Drop your resume</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Supports PDF format (Max 5MB)</p>
            <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Browse Files
            </button>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
          <Target size={20} color="var(--accent-secondary)" />
          <label style={{ fontWeight: '500' }}>Job Description (Optional)</label>
        </div>
        <textarea 
          className="input-field" 
          placeholder="Paste the job description here to get a tailored ATS score and skill gap analysis..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>

      {error && (
        <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <button 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '16px' }}
        onClick={handleAnalyze}
        disabled={!file || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="spinner" size={24} style={{ animation: 'spin 2s linear infinite' }} />
            Analyzing Resume...
          </>
        ) : (
          'Analyze Resume'
        )}
      </button>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default UploadSection;
