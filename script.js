async function analyzeEmotion() {
    const text = document.getElementById('inputText').value.trim();
    if (!text) {
        alert('Please enter some text.');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<p>Analyzing...</p>";

    try {
        const response = await fetch('https://YOUR_RENDER_URL.onrender.com/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `<p>Emotion: ${data.label} (Confidence: ${data.score})</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
