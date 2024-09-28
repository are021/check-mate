from flask import Flask
from utils import get_youtube_subtitles

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './files'

@app.route('/', methods=['GET'])
def index():
    return get_youtube_subtitles("https://www.youtube.com/shorts/pqTvUUIieCU")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


