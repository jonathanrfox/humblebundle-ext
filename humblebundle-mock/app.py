from pprint import pprint
import time

from flask import Flask, jsonify, redirect, render_template, send_file, url_for

app = Flask(__name__)

@app.route('/')
def index():
    time.sleep(5)
    return redirect(url_for('downloads'))

@app.route('/humbundlr/downloads')
def downloads():
    return render_template('index.html')

@app.route('/humbundlr/api', methods=['GET'])
def api():
    return send_file('./data.json')

@app.route('/humbundlr/file/<path:path>')
def file_request(path):
    time.sleep(5);
    return jsonify(dict(path=path))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
