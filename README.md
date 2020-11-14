# Foodie
Clone based off https://www.opentable.com/.

# Features
## Create and search restaurants
Account holders are able to advertise their restaurants on this site to get more people to eat in. Restaraunt owners may name it, set the address, add images, set the pricing and more.

Whether or not they have an account, people are allowed to search for nearby restauraunts around their area based on available seats.
## Reservations
Hungry people looking for nearby restaurants may reserve seats ahead of time, so they don't have to wait when they get to the restaraunt. People who have reservations are able to cut ahead of the line and don't have to wait to be seated.

This also benefit the restaraunt since it'll save time by already having the seats reserved and so they can use the extra time to provide quicker, high quality service.

## Ratings/reviews
These are used to guage interaction between the customers and the restaraunt. Ratings are tied to the restaraunt but are created by the customers.

Note: Reviews are not private, so the reviews should be honest and provide valid criticsm.

## Favorites
Users who find a restaraunts they love or really want to go visit in the future, may bookmark them in the future.

## Bonus: Discover/explore
## Bonus: points for bookings and usage of site


# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository

2. Install dependencies
   ```bash
   pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   python -m database && flask run
   ```
6. To run the React App in development, checkout the [README](./client/README.md) inside the client directory.




***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***


## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run
   ```bash
   heroku login
   ```
5. Login to the heroku container registry
   ```bash
   heroku container:login
   ```
6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry
   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```
8. Release your docker container to heroku
   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```
9. set up your database:
   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} python -m database
   ```
10. Under Settings find "Config Vars" and add any additional/secret .env variables.
11. profit
