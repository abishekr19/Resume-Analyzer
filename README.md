# Resume Analyzer

An AI-powered **Resume Analyzer** that evaluates resumes against job descriptions, acting as an ATS (Applicant Tracking System) reviewer. Built with a full-stack architecture using **Node.js/Express** on the backend and a modern JS frontend, powered by **Google's Gemini API**.

## ✨ Features

- 📄 Upload and analyze resume text against a job description
- 🤖 AI-driven analysis using Google Gemini (`gemini-1.5-flash`)
- 🧪 Graceful fallback to mock data when no API key is configured (great for local UI development)
- 📊 Structured, ATS-style feedback (JSON response format)
- 🖥️ Full-stack app with separate `backend` and `frontend` modules

## 🏗️ Architecture

```
Resume-Analyzer/
├── backend/
│   ├── data/                    # Static/reference data
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API route definitions
│   │   ├── services/
│   │   │   └── aiService.js     # Gemini AI integration & analysis logic
│   │   ├── store/               # Data storage/state management
│   │   └── utils/               # Helper utilities
│   ├── server.js                # Express server entry point
│   ├── package.json
│   └── .gitignore
├── frontend/                    # Client-side application
└── .gitignore
```

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- Google Generative AI SDK (`@google/generative-ai`)
- Gemini 1.5 Flash model

**Frontend:**
- JavaScript (React/Vite — update based on actual setup)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- A [Google Gemini API key](https://ai.google.dev/) (optional — app works with mock data without it)

### 1. Clone the Repository

```bash
git clone https://github.com/abishekr19/Resume-Analyzer.git
cd Resume-Analyzer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

> If no valid API key is provided, the backend automatically returns mock analysis data — useful for frontend development without API costs.

Start the backend server:

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will typically be available at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA) — check your `package.json` scripts.

## 📡 API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/analyze` | POST | Analyzes resume text against an optional job description and returns structured feedback |

**Example request body:**
```json
{
  "resumeText": "Your resume content here...",
  "jobDescription": "Optional job description for tailored analysis"
}
```

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key | No (falls back to mock data) |
| `PORT` | Backend server port | No (defaults vary) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project currently has no license specified. Consider adding one (e.g., MIT) to clarify usage rights.

## 👤 Author

**Abishek R**
GitHub: [@abishekr19](https://github.com/abishekr19)
