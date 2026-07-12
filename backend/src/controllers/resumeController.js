const pdfParser = require('../utils/pdfParser');
const aiService = require('../services/aiService');
const store = require('../store/inMemoryStore');

exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Please upload a PDF resume.' });
        }

        // 1. Extract text from PDF
        const textBuffer = req.file.buffer;
        const resumeText = await pdfParser.parsePdf(textBuffer);

        if (!resumeText || resumeText.trim() === '') {
            return res.status(400).json({ error: 'Could not extract text from the PDF. Ensure it is not an image-based PDF.' });
        }

        // 2. Optional: Job description comparison
        const jobDescription = req.body.jobDescription || '';

        // 3. Analyze with AI
        const analysisResult = await aiService.analyze(resumeText, jobDescription);

        // 4. Persist result to in-memory store for demo purposes and return
        const saved = store.saveAnalysis({
            filename: req.file?.originalname || 'uploaded_resume.pdf',
            result: analysisResult,
            jobDescription: jobDescription || ''
        });

        res.status(200).json({ id: saved.id, ...saved });
    } catch (error) {
        console.error('Error analyzing resume:', error);
        res.status(500).json({ error: `An error occurred during resume analysis: ${error.message}` });
    }
};
