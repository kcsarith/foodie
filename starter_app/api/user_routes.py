from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Restaurant, Favorite
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
    # print(user)
    errors = []

    user = User.query.get_or_404(userId)

    new_name = request.json.get("name")
    new_email = request.json.get("email")
    new_city = request.json.get("city")
    new_state = request.json.get("state")

    checked_name = list(db.session.query(User).filter(User.name == new_name))
    checked_email = list(db.session.query(User)
                         .filter(User.email == new_email))
    is_same_name = user.name == new_name
    is_same_email = user.email == new_email

    if is_same_name:
        if len(checked_name) > 1:
            errors.append('Name already exists')
        else:
            user.name = new_name
    else:
        if len(checked_name) > 0:
            errors.append('Name already exists')
        else:
            user.name = new_name

    if is_same_email:
        if len(checked_email) > 1:
            errors.append('Email already exists')
        else:
            user.email = new_email
    else:
        if len(checked_email) > 0:
            errors.append('Email already exists')
        else:
            user.email = new_email

    user.city = new_city
    user.state = new_state
    if len(errors) == 0:
        print(user)
        db.session.commit()
        return {"user": user.to_dict()}
    else:
        return {'errors': errors, "user": user.to_dict()}


@user_routes.route('/<int:id>', methods=["GET", "POST"])
@login_required
def user_profile(id):
    return {}


@user_routes.route("/<int:user_id>/favorites", methods=["GET", "POST", "DELETE"])
@login_required
def user_favorites(user_id):
    if request.method == "POST":
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        restaurant_id = request.json.get("restaurant_id", None)
        newfavorite = Favorite(user_id=user_id, restaurant_id=restaurant_id)
        db.session.add(newfavorite)
        db.session.commit()
        return 'Restaurant added to favorites', 200
    else:
        response = db.session.query(Favorite) \
                      .options(joinedload(Favorite.restaurant)) \
                      .filter(Favorite.user_id == user_id)
        return {'favorites': [rest.to_dict() for rest in response]}



@user_routes.route("/<int:user_id>/favorites/delete/<int:rest_id>",
                   methods=["DELETE"])
@login_required
def delete_favorite(rest_id, user_id):
    favorite = Favorite.query.filter_by(user_id=user_id).filter_by(restaurant_id=rest_id).first()
    db.session.delete(favorite)
    db.session.commit()
    return 'Delete worked', 200
