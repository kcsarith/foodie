from dotenv import load_dotenv
from starter_app.models import db, User
from starter_app import app

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(username='Ian', email='ian@aa.io', city='nampa', state='Idaho', password='password')
    javier = User(username='Javier', email='javier@aa.io', city='San Diego', state='California', password='password')
    dean = User(username='Dean', email='dean@aa.io', city='San Diego', state='California', password='password')
    angela = User(username='Angela', email='angela@aa.io', city='San Diego', state='California', password='password')
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io', city='San Diego', state='California', password='password')
    alissa = User(username='Alissa', email='alissa@aa.io', city='San Diego', state='California', password='password')

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

    db.session.commit()
