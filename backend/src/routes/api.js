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
router.post('/analyze', upload.single('resume'), resumeController.analyzeResume);

module.exports = router;
