from flask import Blueprint, jsonify
from starter_app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}

# Krisna
@user_routes.route("/:id/update", methods=["GET", "PUT"])
def update():
    id = request.args.get('id')
    user = User.query.get(id)
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    email = request.json.get("email", None)
    user = User.query.filter(User.email == email).first()
    print(user)
    if user:
        # return {"errors":["The email you've entered has been already registed"]}, 400
         return jsonify({"msg": "The email you've entered has been already registed"}), 400
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    city = request.json.get("city", None)
    state = request.json.get("state", None)
    newUser = User(name=name, email=email, password=password, city=city, state=state)
    db.session.add(newUser)
    db.session.commit()
    return {"user": "user" }
