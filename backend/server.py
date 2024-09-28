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
        # Check if the URL already exists in the collection
        existing_entry = collection.find_one({"url": text})
        
        if existing_entry:
            # Return the existing AI result if URL is found
            return jsonify({
                "url": text,
                "ai_result": existing_entry['ai_result']
            }), 200
        
        # If the URL doesn't exist, get the transcript and call the AI
        transcript = get_youtube_subtitles(text)
        ai_result = call_ai(transcript)

        # Add new document with the AI result to the database
        document = {
            "url": text,
            "ai_result": ai_result,
            "timestamp": datetime.datetime.now()
        }
        collection.insert_one(document)

        # Return the AI result
        return jsonify({
            "url": text,
            "ai_result": ai_result
        }), 200
    
    else:
        return jsonify({"error": "Invalid URL"}), 400

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


# https://youtube.com/shorts/ewgpgIQiLqs?si=GLjol1cg1EcnwTsg