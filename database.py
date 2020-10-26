from dotenv import load_dotenv
from starter_app import app, db
from starter_app.models import User

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

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.add(demo)

    db.session.commit()
