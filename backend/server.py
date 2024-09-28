from flask import Flask, request, jsonify
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

@app.route('/recent-videos', methods=['GET'])
def recent_videos():
    try:
        # Retrieve the most recent videos, limit to 10 entries
        recent_entries = collection.find().sort("timestamp", -1).limit(10)
        videos = []
        
        for entry in recent_entries:
            videos.append({
                "url": entry['url'],
                "timestamp": entry['timestamp']
            })
        
        return jsonify(videos), 200
    except Exception as e:
        print(f"Error retrieving recent videos: {e}")
        return jsonify({"error": "Could not retrieve recent videos"}), 500
  

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)


