from . import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(100), unique=True)
    # Relationship to UserInfo
    user_info = db.relationship('UserInfo', backref='user', uselist=False, lazy=True)

class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    phone_number = db.Column(db.String(15))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    # Add any other fields you need

class UserImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    image_url = db.Column(db.String(255))  # URL to the image
    # Add any other fields you might need

    # Relationship to User
    user = db.relationship('User', backref='user_images', uselist=False, lazy=True)
