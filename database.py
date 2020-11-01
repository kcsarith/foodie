from dotenv import load_dotenv
from starter_app.models import User, Restaurant, Reservation, Review, favorites
from starter_app import app, db
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    ian = User(name='Ian', email='ian@aa.io', city='Philadelphia',
               state="PA", password='password', points=300)
    javier = User(name='Javier', email='javier@aa.io', city='Las Vegas',
                  state="NV", password='password', points=400)
    dean = User(name='Dean', email='dean@aa.io', city='Boise',
                state="ID", password='password', points=500)
    angela = User(name='Angela', email='angela@aa.io', city='Baltimore',
                  state="MD", password='password', points=800)
    soonmi = User(name='Soon-Mi', email='soonmi@aa.io', city='Birmingham',
                  state="AL", password='password', points=500)
    alissa = User(name='Alissa', email='alissa@aa.io', city='Houston',
                  state="TX", password='password', points=600)
    demo = User(name='demo', email='demo@example.com', city='New York',
                state="NY", password='password', points=745)

    fork = Restaurant(name='Fork', address='1234 N. 8th Street, New York, 83703', city='New York',
                      state='NY', avg_rating=4.4, min_price=0, max_price=5, img='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                      users=[demo, alissa, soonmi])

    riverside_grill = Restaurant(name='Riverside Grill', address='2051 S. 9th Street, New York, 83686', city='New York',
                                 state='NY', img='https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
                                 users=[demo, dean, angela, javier])

    pf_changs = Restaurant(name='P.F. Chang\'s', address='0987 N. 6th Street, New York, 83686', city='New York',
                           state='NY', img='https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                           users=[demo, alissa, soonmi, dean, ian])

    trillium = Restaurant(name='Trillium', address='1028 E. 4th Street, New York, 83686', city='New York',
                          state='NY',
                          img='https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    kona_grill = Restaurant(name='Kona Grill', address='0129 N. 2nd Street, New York, 83686', city='New York',
                            state='NY',
                            img='https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    mcdonalds = Restaurant(name='McDonald\'s', address='343 N. 1st Ave, New York, 83686', city='New York',
                           state='NY',
                           img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.vixdata.io%2Fpd%2Fjpg-large%2Fen%2Fsites%2Fdefault%2Ffiles%2Fm%2Fmcdonalds_logo.jpg&f=1&nofb=1')

    the_perch = Restaurant(name='The Perch', address=' 727 Elm st, New York, 83686', city='New York',
                           state='NY',
                           img='https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    bittercreek_alehouse = Restaurant(name='Bittercreek Alehouse', address=' 420 crimson ave, Las Vegas, 12345', city='Las Vegas',
                                      state='NV',
                                      img='https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    red_lobster = Restaurant(name='Red Lobster', address=' 0987 12th ave, Las Vegas, 12345', city='Las Vegas',
                             state='NV',
                             img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.D6KxzWOpZCYqwMQlJWSx-wHaFT%26pid%3DApi&f=1')

    lucky_fins_grill = Restaurant(name='Lucky Fins Grill', address='5643 Python st, Las Vegas, 12345', city='Las Vegas',
                                  state='NV',
                                  img='https://images.unsplash.com/photo-1586999768265-24af89630739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    the_griddle = Restaurant(name='The Griddle', address='3500 JavaScript st, Las Vegas, 12345', city='Las Vegas',
                             state='NV',
                             img='https://images.unsplash.com/photo-1529417305485-480f579e7578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    bardenay = Restaurant(name='Bardenay', address='90801 React st, Las Vegas, 12345', city='Las Vegas',
                          state='NV',
                          img='https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    red_robin = Restaurant(name='Red Robin', address='7777 Django ave, Birmingham, 2051', city='Birmingham',
                           state='AL',
                           img='https://images.unsplash.com/photo-1571705042748-55feda1cfadc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    cracker_barrel = Restaurant(name='Cracker Barrel', address='1111 Postgres ln, Birmingham, 2051', city='Birmingham',
                                state='AL',
                                img='https://images.unsplash.com/photo-1581486902120-5880052aadf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    beef_o_brady = Restaurant(name="Beef 'O' Brady's", address='33 Mason st, Birmingham, 2051', city='Birmingham',
                              state='AL',
                              img='https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    masala_bistro = Restaurant(name="Masala Bistro", address=' 4345 Street ave, Houston, 1999', city='Houston',
                               state='TX',
                               img='https://images.unsplash.com/photo-1541086095944-f4b5412d3666?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    the_curb_bar_and_grill = Restaurant(name="The Curb Bar & Grill", address=' 7678 Avenue st, Houston, 1999', city='Houston',
                                        state='TX',
                                        img='https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    ling_and_louies = Restaurant(name="Ling & Louie's", address='1212 chargers st, Houston, 1999', city='Houston',
                                 state='TX',
                                 img='https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

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
    db.session.add(bittercreek_alehouse)
    db.session.add(red_lobster)
    db.session.add(lucky_fins_grill)
    db.session.add(the_griddle)
    db.session.add(bardenay)
    db.session.add(red_robin)
    db.session.add(cracker_barrel)
    db.session.add(beef_o_brady)
    db.session.add(masala_bistro)
    db.session.add(the_curb_bar_and_grill)
    db.session.add(ling_and_louies)

    db.session.commit()
