from flask import Flask, request, jsonify
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

vader = SentimentIntensityAnalyzer()

def classify_sentiment(feedback):
    blob = TextBlob(feedback)
    tb_polarity = blob.sentiment.polarity
    vader_score = vader.polarity_scores(feedback)['compound']
    avg_score = (tb_polarity + vader_score) / 2

    if avg_score > 0.2:
        return 1
    elif avg_score < -0.2:
        return -1
    else:
        return 0

@app.route('/api/sentiment', methods=['POST'])
def get_sentiment():
    data = request.get_json()
    feedback = data.get('feedback', '')

    if not feedback:
        return jsonify({'error': 'Feedback is required'}), 400

    sentiment = classify_sentiment(feedback)
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
