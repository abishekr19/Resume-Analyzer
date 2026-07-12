const analyses = [];

function saveAnalysis(entry) {
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const record = {
    id,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  analyses.push(record);
  return record;
}

function getAllAnalyses() {
  return analyses.slice().reverse();
}

function getAnalysisById(id) {
  return analyses.find(a => a.id === id) || null;
}

module.exports = {
  saveAnalysis,
  getAllAnalyses,
  getAnalysisById,
};
