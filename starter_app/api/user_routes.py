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
    # print(user)
    errors = []

    user = User.query.get_or_404(userId)

    new_name = request.json.get("name")
    new_email = request.json.get("email")
    new_city = request.json.get("city")
    new_state = request.json.get("state")

    checked_name = list(db.session.query(User).filter(User.name == new_name))
    checked_email = list(db.session.query(User).filter(User.email == new_email))
    is_same_name = user.name == new_name
    is_same_email = user.email == new_email
    print('*' * 50)
    print('is this the same name? ', is_same_name)
    print('*' * 50)
    print('is this the same email? ', is_same_email)
    print('*'*50)
    if is_same_name:
        if len(checked_name) > 1:
            errors.append('Name already exists')
        else:
            user.name = new_name
    else:
        if len(checked_name)>0:
            errors.append('Name already exists')
        else:
            user.name = new_name

    if is_same_email:
        if len(checked_email)>1:
            errors.append('Email already exists')
        else:
            user.email = new_email
    else:
        if len(checked_email)>0:
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
        return {'errors':errors,"user": user.to_dict()}

@user_routes.route('/<int:id>', methods=["GET", "POST"])
@login_required
def user_profile(id):
    return {}
