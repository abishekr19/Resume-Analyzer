
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'analyses.json');

let analyses = [];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadFromDisk() {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      analyses = JSON.parse(raw) || [];
    } else {
      analyses = [];
    }
  } catch (err) {
    console.error('Failed to load analyses from disk:', err);
    analyses = [];
  }
}

function saveToDisk() {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(analyses, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save analyses to disk:', err);
  }
}

function saveAnalysis(entry) {
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const record = {
    id,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  analyses.push(record);
  saveToDisk();
  return record;
}

function getAllAnalyses() {
  return analyses.slice().reverse();
}

function getAnalysisById(id) {
  return analyses.find(a => a.id === id) || null;
}

// Initialize store from disk on require
loadFromDisk();

module.exports = {
  saveAnalysis,
  getAllAnalyses,
  getAnalysisById,
};
