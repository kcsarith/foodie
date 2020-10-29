from flask import Blueprint, jsonify, request
from starter_app.models import User, Restaurant, Review, Reservation, db

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

    response = Restaurant.query.filter_by(id=rest_id).first()

    return {'restaurant': response.to_dict()}

# yongho
@bp.route('/restaurant/reserve', methods=["GET", "POST"])
def reserveRes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_id = request.json.get("user_id", None)
    restaurant_id = request.json.get("restaurant_id", None)
    group_num = request.json.get("group_num", None)
    start_time = request.json.get("start_time", None)
    newReserve = Reservation(user_id=user_id, restaurant_id=restaurant_id, group_num=group_num, start_time=start_time )
    db.session.add(newReserve)
    db.session.commit()
    return {}, 200

    