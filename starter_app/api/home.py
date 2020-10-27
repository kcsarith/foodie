from flask import Blueprint, jsonify
from starter_app.models import User, Restaurant

bp = Blueprint("home", __name__)


@bp.route('/<int:id>')
def index(id):
    response = User.query.get(id)
    user_rest = response.to_dict()
    rest_list = Restaurant.query.filter_by(city=user_rest['city']).all()
    return {'restaurants': [rest.to_dict() for rest in rest_list]}
