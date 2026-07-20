import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function getMockAnalysis() {
  const score = Math.floor(Math.random() * 40) + 50;
  return {
    personalDetails: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      location: "San Francisco, CA"
    },
    overallSummary: "A strong candidate with solid frontend experience but lacking some modern cloud-native deployment skills.",
    experienceAnalysis: "Good progression shown in roles, but could use more quantified achievements. The transition from junior to mid-level is clear.",
    educationCheck: "B.S. in Computer Science is highly relevant. Consider adding graduation year if recently graduated.",
    atsScore: score,
    missingKeywords: ["React Testing Library", "CI/CD Pipeline", "Docker", "GraphQL", "AWS"],
    grammarIssues: [
      { issue: "Inconsistent tense in experience section", suggestion: "Use past tense for previous roles and present tense for current role." },
      { issue: "Passive voice used", suggestion: "Change 'Responsibilities included managing' to 'Managed'." }
    ],
    skillGap: "Consider adding more backend specific technologies like Redis or AWS.",
    suggestions: [
      "Quantify your achievements with numbers (e.g., 'Improved performance by 20%').",
      "Add a clear summary section at the top.",
      "Tailor your skills section to match the job description more closely."
    ]
  };
}

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
      timeout: 4000,
    });
    return response.data.result || response.data;
  } catch (error) {
    // If backend is unreachable, return a mock analysis so the frontend remains usable during development
    console.warn('Backend analyze failed, returning mock analysis for UI development.', error?.message || error);
    return getMockAnalysis();
  }
};
