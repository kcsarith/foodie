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

    fork = Restaurant(name='Fork', address='1234 N. 8th Street New York, NY 83703', city='NY',
                      state='NY', avg_rating=4.4, min_price=0, max_price=5)

    riverside_grill = Restaurant(name='Riverside Grill', address='2051 S. 9th Street New Youk, Ny 83686', city='NY',
                                 state='NY')

    pf_changs = Restaurant(name='P.F. Chang\'s', address='0987 N. 6th Street New York, Ny 83686', city='NY',
                           state='NY')

    trillium = Restaurant(name='Trillium', address='1028 E. 4th Street New York, Ny 83686', city='NY',
                          state='NY')

    kona_grill = Restaurant(name='Kona Grill', address='0129 N. 2nd Street New York, Ny 83686', city='NY',
                            state='NY')

    mcdonalds = Restaurant(name='McDonald\'s', address='343 N. 1st Ave. New York, Ny 83686', city='NY',
                           state='NY')

    the_perch = Restaurant(name='The Perch', address=' 727 Elm st, Ny 83686', city='NY',
                           state='NY')

    Ian_reservation = Reservation(user_id=1, restaurant_id=1, group_num=3, start_time=date(2020, 6, 28))

    Ian_review = Review(restaurant_id=1, user_id=1,
                        content='This place is great! me and my family had a great time here!', rating=5)

    demo_reservation = Reservation(user_id=7, restaurant_id=1, group_num=2, start_time=date(2020, 6, 28))

    demo_review = Review(restaurant_id=1, user_id=7,
                         content='''Overall this place was great, had to wait longer for food than I wanted to which is
                                    why I gave it 4 stars but overall I had a great experience!''', rating=4)

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
    db.session.add(demo_reservation)
    db.session.add(demo_review)
    db.session.add(riverside_grill)
    db.session.add(pf_changs)
    db.session.add(trillium)
    db.session.add(kona_grill)
    db.session.add(mcdonalds)
    db.session.add(the_perch)

    db.session.commit()
