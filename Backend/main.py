from flask import Flask, jsonify, request
from flask_cors import CORS
from modelos import db, Player

app = Flask(__name__)
CORS(app)

port = 778
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://francodl:francodl@localhost:777/dragon-gacha'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#Main Page
@app.route('/')
def funcionprimera():
    return 'Dragon Gacha API'


#Returns data from all players
@app.route('/player/', methods=['GET'])
def playerbase():

    players = Player.query.all()
    players_data = []
    playersAmount = 0

    for player in players:
        player_data = {
            'id': player.id,
            'name': player.name,
            'orbs': player.orbs,
            'total_pulls': player.total_pulls
        }
        players_data.append(player_data)
        playersAmount += 1

    players_data.insert(0, {'amount': playersAmount})
    response = jsonify(players_data)
    

    return response

#Returns data from one player
@app.route('/player/<id_player>', methods = ["GET"])
def player(id_player):
    player = Player.query.get_or_404(id_player)
    player_data = {
        'id': player.id,
        'name': player.name,
        'orbs': player.orbs,
        'total_pulls': player.total_pulls
    }

    response = jsonify(player_data)

    return response

#Creates a new player with a name
@app.route('/player', methods = ["POST"])
def addPlayer():
    try:

        data = request.json
        newName = data.get('name')

        newPlayer = Player(name = newName)
        db.session.add(newPlayer)
        db.session.commit()

        return jsonify({'player': {'id': newPlayer.id, 'name': newPlayer.name, 'orbs': newPlayer.orbs, 'total_pulls': newPlayer.total_pulls}})
    
    except:
        return jsonify({'message': 'Internal server error.'})

if __name__ == '__main__':
    print('Starting server...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
    print('Started...')

#/players --> players/leaderboard   Leaderboard
#/players/1                         Specific player
#/players/1/dragons                 All player dragons
#/players/1/dragons/1               Player specific dragon
#

#response.headers.add('Access-Control-Allow-Origin', 'http://localhost:779')
#response.headers.add('Access-Control-Allow-Methods', '*')