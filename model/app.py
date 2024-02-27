from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('./model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    label = ['2', '3', '4', '5']
    
    file_name = file.filename
    value = file_name.split('_')[2]

    try:
        img = Image.open(io.BytesIO(file.read()))
        img = img.resize((128, 128))  
        img = np.array(img) / 255.0  
        img = np.expand_dims(img, axis=0)  # Add batch dimension

        predictions = model.predict(img)
        result = label[np.argmax(predictions)]
        inspect = ''
        
        if result == '2' :
                if value > '0.2' :
                    inspect = '2'
                else :
                    inspect = '3'
        elif result == '3' :
                if value > '0.2' :
                    inspect = '4'
                else :
                    inspect = '5'
        elif result == '4' :
                if value > '0.2' :
                    inspect = '6'
                else :
                    inspect = '7'
        elif result == '5' :
                if value > '0.2' :
                    inspect = '8'
                else :
                    inspect = '9'
        
        print('Inspection Type: ',inspect)

        return jsonify({'predictions': inspect})

    except Exception as e:
        print('Error processing image:', e)  
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
