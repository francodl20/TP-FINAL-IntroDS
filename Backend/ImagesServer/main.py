from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

port = 776

#Main Page
@app.route('/')
def mainPage():
    return 'Dragon Gacha API'

#Returns dragon image
@app.route('/dragons/<id_dragon>')
def player(id_dragon):

    dragon = 'dragons/' + id_dragon + '.png'
    
    return send_file(dragon, mimetype="image/png")

#Returns banner image
@app.route('/banners/<id_banner>')
def banner(id_banner):

    banner = 'banners/' + id_banner + '.png'
    
    return send_file(banner, mimetype="image/png")


if __name__ == '__main__':
    print('Starting server...')
    app.run(host='0.0.0.0', debug=True, port=port)
    print('Started...')