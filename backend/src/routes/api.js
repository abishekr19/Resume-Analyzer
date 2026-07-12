const express = require('express');
const multer = require('multer');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Multer setup for file uploads (store in memory for immediate processing)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Routes
// Health check
router.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'AI Resume Analyzer API' });
});
router.post('/analyze', upload.single('resume'), resumeController.analyzeResume);

// Demo endpoints to list and fetch in-memory saved analyses
const store = require('../store/inMemoryStore');

router.get('/analyses', (req, res) => {
    res.json(store.getAllAnalyses());
});

router.get('/analyses/:id', (req, res) => {
    const record = store.getAnalysisById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
});

module.exports = router;
