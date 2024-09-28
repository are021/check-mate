from flask import Flask, request
from utils import get_youtube_subtitles
from dotenv import load_dotenv
from call_ai import call_ai
import os
import datetime
from pymongo.mongo_client import MongoClient


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './files'
load_dotenv()


uri = os.getenv("MONGODB_URI")
mongo_client = MongoClient(uri) 
db = mongo_client['check-mate']  
collection = db['recent-videos']


@app.route('/', methods=['GET'])
def index():
    return get_youtube_subtitles("https://www.youtube.com/shorts/pqTvUUIieCU")

@app.route('/factcheck', methods=['POST'])
def factcheck():
    text = request.json['url']
    if "youtube" in text:
        # add to database
        document = {
            "url": text,
            "timestamp": datetime.datetime.now()  
        }
        collection.insert_one(document)
        transcript = get_youtube_subtitles(text)
        return call_ai(transcript)
    else:
        return "Invalid URL"
           

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


