const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API (if key is available)
let genAI = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

exports.analyze = async (resumeText, jobDescription = '') => {
    // 1. If no API key, return mock data for development UI testing
    if (!genAI) {
        console.log("No valid Gemini API key found. Returning mock analysis data.");
        return getMockData(resumeText, jobDescription);
    }

    // 2. Use Gemini API
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });
        
        let prompt = `
        You are an expert ATS (Applicant Tracking System) and professional resume reviewer. 
        Analyze the following resume text.
        `;
        
        if (jobDescription) {
            prompt += `Also, compare it against this Job Description: ${jobDescription}. `;
        }
        
        prompt += `
        Return a JSON object with the following exact structure:
        {
            "atsScore": (number between 0 and 100),
            "missingKeywords": (array of strings representing keywords missing from the resume based on general industry standards or the provided job description),
            "grammarIssues": (array of objects with { "issue": string, "suggestion": string }),
            "skillGap": (string explaining the skill gap, especially if a job description is provided),
            "suggestions": (array of strings with actionable advice to improve the resume)
        }
        
        Resume Text:
        ${resumeText}
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        return JSON.parse(responseText);
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Failed to analyze resume with AI.");
    }
};

function getMockData(resumeText, jobDescription) {
    // Generate a slightly randomized mock response for UI testing
    const score = Math.floor(Math.random() * 40) + 50; // Random score between 50-90
    return {
        atsScore: score,
        missingKeywords: ["React Testing Library", "CI/CD Pipeline", "Docker", "GraphQL"],
        grammarIssues: [
            { issue: "Inconsistent tense in experience section", suggestion: "Use past tense for previous roles and present tense for current role." },
            { issue: "Passive voice used", suggestion: "Change 'Responsibilities included managing' to 'Managed'." }
        ],
        skillGap: jobDescription ? "You meet most requirements, but lack explicit experience with containerization (Docker) mentioned in the job description." : "Consider adding more backend specific technologies like Redis or AWS.",
        suggestions: [
            "Quantify your achievements with numbers (e.g., 'Improved performance by 20%').",
            "Add a clear summary section at the top.",
            "Tailor your skills section to match the job description more closely."
        ]
    };
}
