from flask import Blueprint, jsonify, request
from starter_app.models import User, Restaurant
from flask_login import login_required

user_routes = Blueprint('users', __name__)



@user_routes.route('/')
@login_required
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}

@user_routes.route("/<int:userId>/update", methods=["GET", "PATCH"])
def update(userId):
    user = User.query.get(userId)
    print(user)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    city = request.json.get("city", None)
    state = request.json.get("state", None)
    user.name = name
    return {"user": user.to_dict()}

@user_routes.route('/<int:id>', methods=["GET", "POST"])
@login_required
def user_profile(id):
    return {}
