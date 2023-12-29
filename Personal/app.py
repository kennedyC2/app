from flask import Flask
from flask import render_template
from flask import request
from waitress import serve


# Instantiate
app = Flask(__name__)


# Home
@app.route("/", methods=["GET"])
def home():
    if request.method == "GET":
        return render_template("index.html")
    return


# Favicon
@app.route("/favicon.ico", methods=["GET"])
def fav():
    if request.method == "GET":
        return "./static/favicon_io/favicon.ico"
    return


if __name__ == '__main__':
    # app.run(host="0.0.0.0", port=3000, debug=True, use_reloader=True)
    serve(app, host="0.0.0.0", port="3000")
