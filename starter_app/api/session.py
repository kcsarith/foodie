from flask import Blueprint, redirect, url_for, request
from flask_login import current_user, login_user, logout_user

from starter_app.models import User
bp = Blueprint("session", __name__)


@bp.route("/", methods=["GET", "POST"])
def login():
    # if current_user.is_authenticated:
    #     return redirect("/profile")
    console.log(request)
    if form.validate_on_submit():
        customer_email = request.email.data
        customer = User.query.filter(User.email == customer_email).first()
        if not customer or not customer.check_password(request.password.data):
            return redirect(url_for(".login"))
        login_user(customer)
        return customer.to_dict()
    # return redirect(url_for(".login"))


@bp.route('/logout', methods=["POST"])
def logout():
    logout_user()
    return redirect(url_for('.login'))
