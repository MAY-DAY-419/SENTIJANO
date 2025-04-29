from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

emotion_pipeline = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=False
)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        text = data.get("text", "").strip()
        if not text:
            return jsonify({'error': 'Text is empty'}), 400

        result = emotion_pipeline(text)[0]
        return jsonify({
            'label': result['label'],
            'score': round(result['score'], 4)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

