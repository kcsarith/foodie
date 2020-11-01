from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from starter_app.models import User, db


bp = Blueprint("session", __name__)


@bp.route("/login", methods=["GET", "POST"])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)
    if not user_email or not user_password:
        return {"errors": ["Missing required credentials"]}, 400
    user = User.query.filter(User.email == user_email).first()
    if not user or not user.check_password(user_password):
        return {"errors": ["Invalid user credentials"]}, 401
    login_user(user)
    return {"user": current_user.to_dict()}


@login_required
@bp.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return {'msg': "you've been logged out"}, 200


@bp.route("/signup", methods=["GET", "POST"])
def signup():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    email = request.json.get("email", None)
    user = User.query.filter(User.email == email).first()
    if user:
        return jsonify({"errors":
                       "The email you've entered has been already registered"}
                       ), 400
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    city = request.json.get("city", None)
    state = request.json.get("state", None)
    points = request.json.get("points", None)
    newUser = User(name=name, email=email, password=password,
                   city=city, state=state, points=points)
    db.session.add(newUser)
    db.session.commit()
    login_user(newUser)
    return {"user": newUser.to_dict()}
