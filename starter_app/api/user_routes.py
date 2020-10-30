from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Restaurant
from flask_login import login_required
from sqlalchemy.orm import joinedload


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route("/<int:userId>/patch", methods=["GET", "PATCH"])
@login_required
def update(userId):

    user = User.query.get_or_404(userId)
    user.name = request.json.get("name")
    user.email = request.json.get("email")
    user.city = request.json.get("city")
    user.state = request.json.get("state")
    db.session.commit()
    return {"user": user.to_dict()}


@user_routes.route('/<int:id>', methods=["GET", "POST"])
@login_required
def user_profile(id):
    return {}


@user_routes.route("/<int:user_id>/favorites", methods=["GET", "POST"])
@login_required
def user_favorites(user_id):
    if request.method == "POST":
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        user = User.query.get_or_404(user_id)
        restaurant_id = request.json.get("restaurant_id", None)
        rest = Restaurant.query.get(restaurant_id)
        user.restaurants.append(rest)
        db.session.add(user)
        db.session.commit()
    response = db.session.query(Restaurant).order_by(Restaurant.name).options(
                      joinedload(Restaurant.users)
                      ).filter(Restaurant.users.any(id=user_id)).all()
    return {'favorites': [rest.to_dict() for rest in response]}
