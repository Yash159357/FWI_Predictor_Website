from flask import Flask, request, jsonify, render_template, send_from_directory
import os
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Initialize Flask app
application = Flask(__name__, static_url_path='/static')
app = application

# Load models
try:
    ridge_model = pickle.load(open("models/ridge_model_cv.pkl", "rb"))
    scaler_model = pickle.load(open("models/scaler_model.pkl", "rb"))
except Exception as e:
    print(f"Error loading models: {e}")
    ridge_model = None
    scaler_model = None

# # Route to serve static files
# @app.route('/static/<path:path>')
# def serve_static(path):
#     return send_from_directory('static', path)

# Main route
@app.route("/")
def index():
    return render_template("index.html")

# Prediction endpoint
@app.route("/predict", methods=["POST", "GET"])
def predict():
    try:
        if request.method == "GET":
            return jsonify({
                'error': 'GET method not supported. Use POST.',
                'status': 'error'
            }), 405

        # Check if models are loaded
        if ridge_model is None or scaler_model is None:
            return jsonify({
                'error': 'Models not loaded properly',
                'status': 'error'
            }), 500

        # Get JSON data from request
        data = request.get_json()

        if not data:
            return jsonify({
                'error': 'No data provided',
                'status': 'error'
            }), 400

        # Required features based on your model
        required_features = ['Temperature', 'RH', 'Ws', 'Rain', 'FFMC', 'DMC', 'ISI', 'Region', 'isFire']

        # Extract and validate input data
        input_data = []
        missing_fields = []

        for feature in required_features:
            if feature in data and data[feature] is not None:
                input_data.append(float(data[feature]))
            else:
                missing_fields.append(feature)

        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}',
                'status': 'error'
            }), 400

        # Convert to numpy array and reshape for prediction
        input_array = np.array(input_data).reshape(1, -1)

        # Scale the input data
        input_scaled = scaler_model.transform(input_array)

        # Make prediction
        prediction = ridge_model.predict(input_scaled)

        # Return the prediction
        return jsonify({
            'prediction': float(prediction[0]),
            'status': 'success',
            'message': 'Prediction successful'
        })

    except ValueError as ve:
        return jsonify({
            'error': f'Invalid input data: {str(ve)}',
            'status': 'error'
        }), 400

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({
            'error': f'Prediction failed: {str(e)}',
            'status': 'error'
        }), 500


if __name__ == "__main__":
    # Run the app
    app.run(debug=True, port=5000, host='0.0.0.0')
