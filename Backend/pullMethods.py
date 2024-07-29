from modelos import db, Player, GachaInfo, GachaChances, GachaPool, DragonStats
from random import randrange

def getChances(bannerID):
    chances = GachaChances.query.where(GachaChances.gacha == bannerID).all()
    chancesData = {
        'three_star_percent': chances[0].three_star_percent,
        'four_star_percent': chances[0].four_star_percent,
        'five_star_percent': chances[0].five_star_percent,
        'six_star_percent': chances[0].six_star_percent
    }
    response = chancesData
    return response

def useChances(bannerID, chances):
    pullNumber = randrange(start=100)
    #var pullNumber = Math.floor(Math.random() * 100)
    print('Random: ' + str(pullNumber))

    logic3 = chances['three_star_percent']
    logic4 = chances['four_star_percent']
    logic5 = chances['five_star_percent']
    logic6 = chances['six_star_percent']

    if (pullNumber <= logic3):
        #Get a 3 star
        stars = 3
    elif (pullNumber <= (logic3 + logic4)):
        #Get a 4 star
        stars = 4
    elif (pullNumber <= (logic3 + logic4 + logic5)):
        #Get a 5 star
        stars = 5
    elif (pullNumber <= (logic3 + logic4 + logic5 + logic6)):
        #Get a 6 star
        stars = 6
    else:
        stars = 404
    
    return stars

def getDragons(bannerID, stars):
    dragons = GachaPool.query.where(GachaPool.gacha_id == bannerID, GachaPool.stars == stars).all()

    dragonsData = []
    dragonsAmount = 0

    for dragon in dragons:
        dragonData = {
            'dragon_id': dragon.dragon_id,
            'stars': dragon.stars
        }
        dragonsData.append(dragonData)
        dragonsAmount += 1

    dragonsData.insert(0, {'amount': dragonsAmount})
    response = dragonsData
    return response

def pullResult(dragons):
    print(dragons)

    dragonAmount = dragons[0]['amount'] + 1

    randDragon = randrange(1, dragonAmount, 1)
    
    dragonID = dragons[randDragon]['dragon_id']
    dragonStars = dragons[randDragon]['stars']

    dragon = DragonStats.query.get_or_404(dragonID)

    response_data = {
        'id': dragon.id,
        'name': dragon.name,
        'stars': dragonStars
    }

    return response_data

def pullDragon(bannerID):
    chances = getChances(bannerID)
    stars = useChances(bannerID, chances)
    dragons = getDragons(bannerID, stars)
    result = pullResult(dragons)

    return result