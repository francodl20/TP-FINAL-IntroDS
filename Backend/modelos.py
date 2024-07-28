import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class DragonStats(db.Model):
    __tablename__ = 'dragon_stats'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String[40], nullable = False)
    category = db.Column(db.String[40], nullable = False)
    hp = db.Column(db.Integer, nullable = False)
    attack = db.Column(db.Integer, nullable = False)
    defense = db.Column(db.Integer, nullable = False)
    max_lvl = db.Column(db.Integer, nullable = False)
    max_asc = db.Column(db.Integer, nullable = False)
    
class GachaInfo(db.Model):
    __tablename__ = 'gacha_info'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String[40], nullable = False)
    chances = db.Column(db.Integer, db.ForeignKey('gacha_chances.id'))
    pool = db.Column(db.Integer, db.ForeignKey('gacha_pool.id'))

class GachaChances(db.Model):
    __tablename__ = 'gacha_chances'
    id = db.Column(db.Integer, primary_key = True)
    six_star_percent = db.Column(db.Double, nullable = False)
    five_star_percent = db.Column(db.Double, nullable = False)
    four_star_percent = db.Column(db.Double, nullable = False)
    three_star_percent = db.Column(db.Double, nullable = False)

class GachaPool(db.Model):
    __tablename__ = 'gacha_pool'
    id = db.Column(db.Integer, primary_key = True)
    dragon_id = db.Column(db.Integer, db.ForeignKey('dragon_stats.id'))
    stars = db.Column(db.Integer, nullable = False)

class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String[40], nullable = False)
    orbs = db.Column(db.Integer, default = 10)
    total_pulls = db.Column(db.Integer, default = 0)

class PlayerDragons(db.Model):
    __tablename__ = 'players_dragons'
    id = db.Column(db.Integer, primary_key = True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    dragon_id = db.Column(db.Integer, db.ForeignKey('dragon_stats.id'))
    lvl = db.Column(db.Integer, default = 1)
    asc = db.Column(db.Integer, nullable = False)