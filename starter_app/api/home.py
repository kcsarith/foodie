<<<<<<< HEAD
from flask import Blueprint, jsonify, request
from starter_app.models import User, Restaurant, Review, Reservation, db
=======
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from starter_app.models import db, User, Restaurant, Review
>>>>>>> main

bp = Blueprint("home", __name__)


@bp.route('/', methods=["POST"])
def search():
    term = request.get_json()
    search_args = [col.ilike('%%%s%%' % term) for col in
                   ['name', 'address', 'city', 'avg_rating', 'max_price']]
    restaurants = Restaurant.query.filter(or_(*search_args)).all()
    ordered_rests = restaurants.order_by(Restaurant.avg_rating.desc())
    return {'restaurants': [rest.to_dict() for rest in ordered_rests]}


@login_required
@bp.route('/<int:id>')
def index(id):
    response = User.query.get(id)
    user_rest = response.to_dict()
    rest_list = Restaurant.query.filter_by(city=user_rest['city']).all()
    return {'restaurants': [rest.to_dict() for rest in rest_list]}


@login_required
@bp.route('/restaurant/<int:rest_id>', methods=["GET", "POST"])
def reviews(rest_id):
    rest = Restaurant.query.get(rest_id)
    if not rest:
        return {"errors": ["Invalid restaurant requested"]}, 401
    if request.method == "POST":
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        content = request.json.get("content", None)
        rating = request.json.get("rating", None)
        if not content or not rating:
            return {"errors": ["Please fill out review and rating"]}, 400
        new_review = Review(restaurant_id=rest_id, user_id=current_user.id,
                            content=content, rating=rating)
        db.session.add(new_review)
        db.session.commit()
    response = Review.query.filter_by(restaurant_id=rest_id).all()
    return {'reviews': [review.to_dict() for review in response]}


@login_required
@bp.route('/restaurant/profile/<int:rest_id>')
def profile(rest_id):

    response = Restaurant.query.filter_by(id=rest_id).first()

    return {'restaurant': response.to_dict()}

<<<<<<< HEAD
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

    
=======

@bp.route('/reviews/<int:rev_id>')
def rev(rev_id):

    response = User.query.filter_by(id=rev_id).first()

    return {'user': response.to_dict()}
>>>>>>> main
