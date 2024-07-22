from flask import Flask, jsonify, request
from modelos import db, Player

app = Flask(__name__)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://francodl:francodl@localhost:777/dragon-gacha'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def funcionprimera():
    return 'Por favor que funcione'

@app.route('/player/', methods = ["GET"])
def datas(id_player):
    players = Player.query.all()
    players_data = []
    for player in players:
        player_data = {
            'id': player.id,
            'name': player.name,
            'orbs': player.orbs,
            'total_pulls': player.total_pulls
        }
        players_data.append(player_data)
    return player_data   

@app.route('/player/<id_player>', methods = ["GET"])
def data(id_player):
    player = Player.query.get_or_404(id_player)
    player_data = {
        'id': player.id,
        'name': player.name,
        'orbs': player.orbs,
        'total_pulls': player.total_pulls
    }
    return jsonify(player_data)

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