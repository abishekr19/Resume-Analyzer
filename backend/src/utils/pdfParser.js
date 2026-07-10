const pdf = require('pdf-parse');

exports.parsePdf = async (dataBuffer) => {
    try {
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF.');
    }
};
