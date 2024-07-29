from flask import Flask, jsonify, request
from flask_cors import CORS
from modelos import db, Player, GachaInfo, GachaChances, PlayerDragons, DragonStats
from pullMethods import pullDragon

app = Flask(__name__)
CORS(app)

port = 778
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://francodl:francodl@localhost:777/dragon-gacha'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#Main Page
@app.route('/')
def mainPage():
    return 'Dragon Gacha API'

#Returns data for all players
@app.route('/players/', methods = ['GET'])
def playerbase():

    players = Player.query.all()
    playersData = []
    playersAmount = 0

    for player in players:
        playerData = {
            'id': player.id,
            'name': player.name,
            'orbs': player.orbs,
            'totalPulls': player.total_pulls
        }
        playersData.append(playerData)
        playersAmount += 1

    playersData.insert(0, {'amount': playersAmount})
    response = jsonify(playersData)
    
    return response

#Returns data for one player
@app.route('/players/<playerID>', methods = ["GET"])
def player(playerID):
    player = Player.query.get_or_404(playerID)
    player_data = {
        'id': player.id,
        'name': player.name,
        'orbs': player.orbs,
        'totalPulls': player.total_pulls
    }
    response = jsonify(player_data)
    return response

#Updates data for one player
@app.route('/players/<playerID>', methods = ["PUT"])
def playerUpdate(playerID):
    player = Player.query.get_or_404(playerID)

    data = request.json
    pulls = data.get('pulls')

    print(pulls)

    orbs = player.orbs
    player.orbs = orbs - pulls

    print(orbs)

    if (pulls > 0):
        total = player.total_pulls
        player.total_pulls = total + pulls

    db.session.commit()

    return 200

#Returns player's dragons info
@app.route('/players/<playerID>/dragons/', methods = ["GET"])
def playerDragons(playerID):

    dragons = PlayerDragons.query.where(PlayerDragons.player_id == playerID).all()

    dragonsData = []
    dragonsAmount = 0

    for dragon in dragons:
        dragonStats = DragonStats.query.get_or_404(dragon.dragon_id)

        dragonData = {
            'id': dragon.id,
            'name': dragonStats.name,
            'lvl': dragon.lvl,
            'stars': dragon.asc + 3
        }
        dragonsData.append(dragonData)
        dragonsAmount += 1

    dragonsData.insert(0, {'amount': dragonsAmount})
    response = jsonify(dragonsData)

    return response

#Delete dragon
@app.route('/players/<playerID>/<deleteID>', methods = ["DELETE"])
def deleteDragon(playerID, deleteID):
   
    PlayerDragons.query.filter_by(id=deleteID).delete()
    db.session.commit()

    return jsonify({'player': playerID, 'dragonID': deleteID}), 200

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
        return jsonify({'message': 'Internal server error.'}), 500




#Returns data for all banners
@app.route('/banners/', methods = ['GET'])
def gachaBanners():

    banners = GachaInfo.query.all()
    bannersData = []
    bannersAmount = 0

    for banner in banners:
        bannerData = {
            'id': banner.id,
            'name': banner.name
        }
        bannersData.append(bannerData)
        bannersAmount += 1

    bannersData.insert(0, {'amount': bannersAmount})
    response = jsonify(bannersData)
    
    return response

#Returns data for one banner
@app.route('/banners/<bannerID>', methods = ['GET'])
def banner(bannerID):
    banner = GachaInfo.query.get_or_404(bannerID)
    bannerData = {
        'id': banner.id,
        'name': banner.name
    }
    response = jsonify(bannerData)
    return response

#Returns chances for one banner
@app.route('/banner/<bannerID>/pull', methods = ['GET'])
def pull(bannerID):
    dragonInfo = pullDragon(bannerID)
    response = jsonify(dragonInfo)
    return response

#Add dragon to one player
@app.route('/player/dragons', methods = ['POST'])
def addDragon():
    try:

        data = request.json
        playerID = data.get('playerID')
        dragonID = data.get('dragonID')
        asc = data.get('stars') - 3

        print(data)

        newDragon = PlayerDragons(player_id=playerID, dragon_id=dragonID, asc=asc)
        db.session.add(newDragon)
        db.session.commit()

        print(newDragon)

        return jsonify({'Dragon': {'id': newDragon.id, 'playerID': newDragon.player_id, 'dragonID': newDragon.dragon_id, 'asc': newDragon.asc}})
    except:
        return jsonify({'message': 'Internal server error.'})   
        



if __name__ == '__main__':
    print('Starting server...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
    print('Started...')



#response.headers.add('Access-Control-Allow-Origin', 'http://localhost:779')
#response.headers.add('Access-Control-Allow-Methods', '*')