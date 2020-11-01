from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

favorites = db.Table(
    'favorites',
    db.Model.metadata,
    db.Column(
        'user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True
    ), db.Column('restaurant_id', db.Integer,
                 db.ForeignKey('restaurants.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer, nullable=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    reservations = db.relationship('Reservation', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)
    restaurants = db.relationship('Restaurant', secondary=favorites)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "email": self.email,
          "city": self.city,
          "state": self.state,
          "hashed_password": self.hashed_password,
          "points": self.points
        }


class Restaurant(db.Model):

    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    avg_rating = db.Column(db.Float, nullable=True)
    min_price = db.Column(db.Integer, nullable=True)
    max_price = db.Column(db.Integer, nullable=True)
    img = db.Column(db.String(1000), nullable=False)
    reviews = db.relationship('Review', backref='restaurant', lazy=True)
    reservations = db.relationship('Reservation',
                                   backref='restaurant', lazy=True)
    users = db.relationship('User', secondary=favorites,
                            lazy='subquery')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "avg_rating": self.avg_rating,
            "min_price": self.min_price,
            "max_price": self.max_price,
            'img': self.img
        }


class Reservation(db.Model):

    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    restaurant_id = db.Column(db.Integer,
                              db.ForeignKey('restaurants.id'), nullable=False)
    group_num = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.DateTime(timezone=True), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "restaurant_id": self.restaurant_id,
            "group_num": self.group_num,
            "start_time": self.start_time,
            "restaurant_name": self.restaurant.name,
            "restaurant_address": self.restaurant.address,
            "restaurant_avg_rating": self.restaurant.avg_rating,
            "restaurant_city": self.restaurant.city,
            "restaurant_state": self.restaurant.state,
            "restaurant_img": self.restaurant.img
        }


class Review(db.Model):

    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer,
                              db.ForeignKey('restaurants.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "user_id": self.user_id,
            "content": self.content,
            "rating": self.rating,
            "user_name": self.user.name
        }
