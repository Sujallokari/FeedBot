const vader = require("vader-sentiment");

/**
 * Analyze sentiment using VaderSentiment.
 * @param {string} text - The feedback text to analyze.
 * @returns {number} - Returns 1 for positive, 0 for neutral, -1 for negative.
 */
function analyzeSentiment(text) {
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  const compound = intensity.compound;

  if (compound >= 0.25) return 1;     // Positive
  if (compound <= -0.25) return -1;   // Negative
  return 0;                           // Neutral
}

module.exports = analyzeSentiment;
