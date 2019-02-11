import time
from flask import Flask, jsonify, redirect, render_template, send_file, url_for

app = Flask(__name__)


@app.route('/start')
def index():
    '''The index route that simulates a small lag before redirecting.'''
    time.sleep(5)
    return redirect(url_for('downloads'))


@app.route('/downloads')
def downloads():
    '''The route that a user will end up at to download bundle.'''
    return render_template('index.html')


@app.route('/api/v1/order', methods=['GET'])
def api():
    '''The route that /humblebundle-ext/downloads will request.'''
    return send_file('./data.json')


@app.route('/file/<path:path>')
def file_request(path):
    '''A route for testing filepaths.'''
    time.sleep(5)
    return jsonify(dict(path=path))


if __name__ == '__main__':
    app.run(debug=True, port=5000)
