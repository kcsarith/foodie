from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy import or_
from starter_app.models import db, User, Restaurant, Review, Reservation
from sqlalchemy.orm import joinedload
import googlemaps
import os
import pprint
import time
from datetime import datetime
import pprint
import random

llave = os.environ.get("BACK_END_KEY")
gmaps = googlemaps.Client(key=llave)

bp = Blueprint("home", __name__)

images = ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1586999768265-24af89630739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1529417305485-480f579e7578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1571705042748-55feda1cfadc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1581486902120-5880052aadf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1541086095944-f4b5412d3666?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
           'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60']

@bp.route('/', methods=["POST"])
def search():
    res = []
    front = []
    lat = request.get_json()['lat']
    lng = request.get_json()['lng']
    loc_string = f"{str(lat)},{str(lng)}"
    places_res = gmaps.places_nearby(location=loc_string,
                                     radius=2000,
                                     open_now=False, type='restaurant')

    for i in places_res['results']:
        res.append(i)
    for item in res:
        randImg = random.randint(0,len(images) - 1)
        my_place_id = item['place_id']
        my_fields = ['formatted_address']
        place_details = gmaps.place(place_id=my_place_id, fields=my_fields)
        city = item['vicinity'].split(',')
        state = place_details['result']['formatted_address'].split(',')[
                              -2].split(' ')[1]
        newRest = Restaurant(name=item['name'],
                             address=place_details['result'][
                               'formatted_address'],
                             city=city[-1], state=state, img=images[randImg])
        front.append(newRest)
        db.session.add(newRest)
    db.session.commit()
    return {'restaurants': [val.to_dict() for val in front]}


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
@bp.route('/restaurant/<int:rest_id>/patch-review', methods=["GET", "PATCH"])
def patch_review(rest_id):
    id = request.json.get("id")
    new_content = request.json.get("content")
    new_rating = request.json.get("rating")

    review = Review.query.get_or_404(id)

    review.content = new_content
    review.rating = new_rating
    db.session.commit()
    return {'review': review.to_dict()}

@login_required
@bp.route('/restaurant/profile/<int:rest_id>')
def profile(rest_id):

    response = Restaurant.query.filter_by(id=rest_id).first()
    return {'restaurant': response.to_dict()}


@login_required
@bp.route('/restaurant/reserve', methods=["GET", "POST"])
def reserveRes():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    user_id = request.json.get("user_id", None)
    restaurant_id = request.json.get("restaurant_id", None)
    group_num = request.json.get("group_num", None)
    start_time = request.json.get("start_time", None)
    newReserve = Reservation(user_id=user_id, restaurant_id=restaurant_id,
                             group_num=group_num, start_time=start_time)
    db.session.add(newReserve)
    db.session.commit()
    return {'reservation': newReserve.to_dict()}, 200

@bp.route('/restaurant/reservationlist/<int:user_id>')
def reservationlist(user_id):

    response = db.session.query(Reservation) \
                      .options(joinedload(Reservation.restaurant)) \
                      .filter(Reservation.user_id == user_id)
    return {'reservation': [reservation.to_dict() for reservation in response]}


@bp.route('/restaurant/review/<int:restaurant_id>')
def reviewlist(restaurant_id):

    response = db.session.query(Review) \
                      .options(joinedload(Review.user)) \
                      .filter(Review.restaurant_id == restaurant_id)
    return {'reservation': [reservation.to_dict() for reservation in response]}


@login_required
@bp.route('/restaurant/reservationcancel/<int:reserv_id>',
          methods=["DELETE", "GET"])
def reservationcancel(reserv_id):
    reserv = Reservation.query.filter(Reservation.id == reserv_id).first()
    if reserv:
        db.session.delete(reserv)
        db.session.commit()
        return {}, 200
    return {}, 404


@login_required
@bp.route('/restaurant/setpoint/<int:user_id>', methods=["PATCH"])
def earnpoint(user_id):
    user = User.query.filter(User.id == user_id).first()
    set_point = request.json.get("set_point", None)
    if user:
        user.points = User.points + set_point
        db.session.commit()
        return {"user": user.to_dict()}, 200
    return {}, 404


@bp.route('/reviews/<int:rev_id>')
def rev(rev_id):

    response = User.query.filter_by(id=rev_id).first()
    return {'user': response.to_dict()}
