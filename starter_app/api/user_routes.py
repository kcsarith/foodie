from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Restaurant
from flask_login import login_required

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


@user_routes.route("/<int:userId>/favorite", methods=["GET", "POST"])
@login_required
def user_favorite(userId):
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user = User.query.get_or_404(userId)
    user.name = request.json.get("name")
    user.email = request.json.get("email")
    user.city = request.json.get("city")
    user.state = request.json.get("state")
    print(user)
    db.session.commit()
    return {"user": user.to_dict()}
