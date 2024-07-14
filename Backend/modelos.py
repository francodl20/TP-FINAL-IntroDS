import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class DragonType(db.Model):
    __tablename__ = 'base_dragons'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String[40], nullable = False)
    attack = db.Column(db.Integer, nullable = False)
    hp = db.Column(db.Integer, nullable = False)
    type = db.Column(db.String[40], nullable = False)
    stars = db.Column(db.Integer, nullable = False)
