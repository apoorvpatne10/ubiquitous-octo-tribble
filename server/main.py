import io
import csv
import json
from flask import Flask
from flask import request, redirect
from flask import jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/file_upload", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload():
    if request.method == "POST":

        if "file" not in request.files:
            return "fuck"

        my_file = request.files["file"]

        stream = io.StringIO(my_file.stream.read().decode("UTF8"), newline=None)
        csv_input = csv.reader(stream)

        keys = []
        for row in csv_input:
            keys = row
            break

        my_data = []

        for row in csv_input:
            temp = dict()
            for key, val in zip(keys, row):
                temp[key] = val

            my_data.append(temp)

        with open("data.json", "w") as fo:
            print("JSON FILE CREATED")
            json.dump(my_data, fo)

        return jsonify(my_data)


@app.route("/get_file", methods=["GET"])
def get_file():
    try:
        with open("data.json", "r") as rf:
            data = json.load(rf)
            return jsonify(data)
    except Exception as e:
        return ""


if __name__ == "__main__":
    app.run(debug=True)
