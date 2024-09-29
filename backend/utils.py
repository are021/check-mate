import re
from youtube_transcript_api import YouTubeTranscriptApi
import os
from pytube import YouTube

SMARTPROXY_USER = os.getenv("SMARTPROXY_USER")
SMARTPROXY_PASSWORD = os.getenv("SMARTPROXY_PASSWORD")
SMARTPROXY_URL = os.getenv("SMARTPROXY_URL")
SMARTPROXY_PORT = os.getenv("SMARTPROXY_PORT")
proxy = {
    "http": f"http://{SMARTPROXY_USER}:{SMARTPROXY_PASSWORD}@{SMARTPROXY_URL}:{SMARTPROXY_PORT}",
    "https": f"http://{SMARTPROXY_USER}:{SMARTPROXY_PASSWORD}@{SMARTPROXY_URL}:{SMARTPROXY_PORT}",
}
def get_youtube_video_id(url):
    """
    Extracts the video ID from a YouTube URL.
    Supports standard, short, and embedded YouTube URLs.
    """
    # Regular expression to match different YouTube URL formats
    pattern = r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/)|youtu\.be\/)([0-9A-Za-z_-]{11})'
    
    match = re.search(pattern, url)
    
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid YouTube URL or unsupported format")


def get_youtube_subtitles(url):
    try:
        # Extract video ID from URL
        video_id = get_youtube_video_id(url)
        
        # Fetch the transcript for the given video id
        transcript = YouTubeTranscriptApi.get_transcript(video_id, proxies=proxy)
        # transcript = YouTubeTranscriptApi.get_transcript(video_id)

        condensed_transcript = condense_transcript(transcript)

        # Return the subtitles in a list of dictionaries
        return condensed_transcript
    except Exception as e:
        print(f"Error: {e}")
        return {"error": True, "message": str(e), "subtitles": []}


def condense_transcript(transcript):
    condensed_transcript = {}
    current_minute = 0
    current_chunk = []

    for entry in transcript:
        # Calculate the minute the subtitle belongs to
        minute = int(entry['start'] // 60)  # Convert seconds to minutes
        
        # If the current entry is in the same minute, add its text to the current chunk
        if minute == current_minute:
            current_chunk.append(entry['text'])
        else:
            # If we've moved to a new minute, save the previous chunk
            condensed_transcript[current_minute] = ' '.join(current_chunk)
            
            # Start a new chunk for the new minute
            current_minute = minute
            current_chunk = [entry['text']]
    
    # Add the last chunk after the loop
    condensed_transcript[current_minute] = ' '.join(current_chunk)
    
    return condensed_transcript

