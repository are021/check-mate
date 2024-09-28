from flask import Flask, request
from utils import get_youtube_subtitles
from dotenv import load_dotenv
from call_ai import call_ai


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './files'
load_dotenv()

@app.route('/', methods=['GET'])
def index():
    return get_youtube_subtitles("https://www.youtube.com/watch?v=4QXUdPskzNs&ab_channel=LiveNOWfromFOX")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    text = request.json['text']
    return call_ai(text)
           

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


