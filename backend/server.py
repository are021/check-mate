from flask import Flask



app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './files'

@app.route('/', methods=['GET'])
def index():
    return 'Hello World'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)