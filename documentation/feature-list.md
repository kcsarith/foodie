* As an unauthorized user I want to be directed to the sign-up page and have the ability to sign up

  - Questions?
    1. What information do we need from the user to sign up?
      - We need name, city,state, and password
    2. Where should users be directed after signup?
      - The user will be redirected to the home page where they can then use the app
    3. What happens if the user enters invalid or incomplete information when signing up?
      - Through error handling messages will appear on the page indicating what part of the field was incomplete or invalid

  - Acceptance Criteria
    - If the user is a new user they will be added to the database after they complete the sign up process and redirected to the home page
    - If a user is logging in, their data will be retrieved from the database and they will be redirected to the homepage with that data


* As an authorized user I want to be able to search, favorite, write reviews, and make reservations at resturaunts in my area

  - Questions?
    1. Where are we going to get all of the restaurants from? 
      - they will be retrieved from our DB or the google places API
    2. What should the user see when they search a resturaunt?
      - The user will be able to see all of the resturaunt in their city that they can make reservations at
    3. How should a user be able to make a review?
      - The user will be able to write a review under through a form
    4. How will a user be able to make a reservation?
      - Through a form field they will input the number of people and what time they want the reservation from followed by the click of a button
    5. What will favoriting a resturaunt look like?
      - The users will be able to click a star or favorite button and that resturaunt will be added to the users favorite in the DB which will then be in their profile

  - Acceptance Criteria
    - A user can search for restaurants by location or name and it will render all the resturaunts in the area
    - Users can write reviews for resturaunts which will then be rendered when the resturaunt page is pulled up
    - Users can favorite a resturaunt which will then be added to their favorites
    - Users can make a reservation at a resturaunt and choose what time and how many people


* As a authorized user I want to be able to logout and log back in and see my same profile

    - Questions?
      1. How will the user be able to logout?
        - The user will be able to logout via a button on the navbar
      2. What will happen when the user logs out?
        - The page will be redirected to the login/signup page and the users info will be stored in the database
      3. What happens when an existing user logs back in?
        - The users information will be retrieved from the databse and it will render resturaunts with their saved location and add their data to their profile

    - Acceptance Criteria:
      - When a user logs out they will be redirected to the login/signup page and their information will be stored
      - When a user logs back in they will see resturaunts in their area
      - When a user logs out they can not return to the home page without logging back in
      - When a user navigates to their profile they will see their favorite and reviews
