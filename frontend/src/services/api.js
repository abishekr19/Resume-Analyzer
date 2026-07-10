import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription) {
    formData.append('jobDescription', jobDescription);
  }

  try {
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in analyzeResume:', error);
    throw error.response?.data?.error || 'Failed to analyze resume';
  }
};
