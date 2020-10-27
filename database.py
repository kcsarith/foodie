from dotenv import load_dotenv
from starter_app.models import User, Restaurant, Reservation, Review, favorites
from starter_app import app, db
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    ian = User(name='Ian', email='ian@aa.io', city='SF',
               state="CA", password='password')
    javier = User(name='Javier', email='javier@aa.io', city='SF',
                  state="CA", password='password')
    dean = User(name='Dean', email='dean@aa.io', city='SF',
                state="CA", password='password')
    angela = User(name='Angela', email='angela@aa.io', city='SF',
                  state="CA", password='password')
    soonmi = User(name='Soon-Mi', email='soonmi@aa.io', city='SF',
                  state="CA", password='password')
    alissa = User(name='Alissa', email='alissa@aa.io', city='SF',
                  state="CA", password='password')
    demo = User(name='demo', email='demo@example.com', city='NY',
                state="NY", password='password')

    fork = Restaurant(name='Fork', address='1234 N. 8th Street Boise, ID 83703', city='Boise',
                      state='ID', avg_rating=4.4, min_price=0, max_price=5)

    Ian_reservation = Reservation(user_id=1, restaurant_id=1, group_num=3,start_time=date(2020, 6, 28))
    Ian_review = Review(restaurant_id=1, user_id=1,
                        content='This place is great! me and my family had a great time here!', rating=4)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.add(demo)
    db.session.add(fork)
    db.session.add(Ian_reservation)
    db.session.add(Ian_review)

    db.session.commit()
