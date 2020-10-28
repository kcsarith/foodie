from flask import Blueprint, jsonify
from starter_app.models import User, Restaurant, Review

bp = Blueprint("home", __name__)


@bp.route('/<int:id>')
def index(id):
    response = User.query.get(id)
    user_rest = response.to_dict()
    rest_list = Restaurant.query.filter_by(city=user_rest['city']).all()
    return {'restaurants': [rest.to_dict() for rest in rest_list]}


@bp.route('/restaurant/<int:rest_id>')
def reviews(rest_id):

    response = Review.query.filter_by(id=rest_id).all()

    return {'reviews': [review.to_dict() for review in response]}


@bp.route('/restaurant/profile/<int:rest_id>')
def profile(rest_id):
    print("AAAAAAAAAAAAA")
    print("id", rest_id)
    response = Restaurant.query.filter_by(id=rest_id).first()
    return {'restaurant': [response.to_dict()]}
    
    # pass
