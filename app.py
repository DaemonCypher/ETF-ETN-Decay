from engine import *
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/get_decay_data', methods=['GET'])
def get_decay_data():
    stock = request.args.get('stock')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    if not all([stock, start_date, end_date]):
        return jsonify({"error": "Missing parameters"}), 400

    decay_data = driver(stock, start_date, end_date)

    if decay_data is None:
        return jsonify({"error": "Stock not found or invalid data"}), 404

    if decay_data == -400 or decay_data == -401:
        return jsonify({"error": f"Error in processing data: {decay_data}"}), 500

    return jsonify({"stock": stock, "start_date": start_date, "end_date": end_date, "decay_data": decay_data})

if __name__ == '__main__':
    app.run(debug=True)