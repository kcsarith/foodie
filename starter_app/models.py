from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    hashed_password = db.Column(db.String(100), nullable=False)

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
        }
