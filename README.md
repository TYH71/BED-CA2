# README

## Repository

- client
    - contains files for the Front-End (etc. HTML, CSS, JS)
    - public - contains static files which will be served in the browser
- server
    - contains files for the Backend (etc. app.js, databaseConfig.js, .env.development)
    - model, controller, db (MVC structure)
- stockimages
    - contains stock images to demostrate image uploading process
- Assignment Brief
- README.md
    - text file to provide instructions

## Instructions

1. Run the provided sql dump file in mySQL workbench
2. go to /server/.env.development and adjust the configurations (DB_HOST, DB_USER, DB_PASSWORD) accordingly.
3. Open two terminal, Terminal 1 change the directory to /client, Terminal 2 change the directory to /server
4. type this command in both terminal ‘npm run start-dev’, ensure that there is the terminal shows ‘localhost:3000’ (server) and ‘localhost:3001’ (client)
5. Open browser and enter ‘localhost:3001’, browse through the pages accordingly
- * brcrypt is used to hash the password, I will give the relevant admin information, the rest of the user's password are stored in the seperate table, mysql assignment2.hash_password

username: TYH

password: password

## HTML Pages

- index.js - landing page
- login.html - Login page to logged into the respective users
- signup.html - page to create a customer (non-admin) user
- games.html - page to show game listing and a search box
- game.html - page which shows the relevant game details, all reviews made, and a section to submit a review for the page
- admin.html - can only be assessed by an admin user, page to create categories and create games

## Requirements done

- Front-End for web application - open source templates was download from the internet and edited to better suit this assignment
- Persistent Login - done in login.html. After logging in, the page will defer to the previous page it was located at, the log in button is toggled to log out
- Search Game by title, platform and price - done in games.html. is able to search games independently by each variables. title is searched using RegEx (regular expression) so feel free to use any subset of the game title (eg. 'mine' ⇒ 'minecraft')
- view game detail - found in game.html. clicking read more on the game card (in games.html) will change page to view game details. (game information) Also shows the reviews
- add new reviews - found in game.html. client checks for presense of token to allow this prompt. submit reviews cause page to refresh and show the updated list of reviews. user authentication by jwt is checked when submitting reviews (middleware)
- add new game - found in admin.html. submit a new game, check for admin rights using JWT. (middleware) every variable is required except for image upload. submitting then sends to the game details page. (game.html)
- add new category - found in admin.html. submit a new category, check for JWT for admin rights (middleware). page refresh after submitting. 422 error will be displayed for duplicate entry
- JWT checking - JWT is check for user/admin authentication for add reviews, add games, and add categories. refreshing/loading a page will automatically checks the token for admin priviledges and adjust accordingly (endpoint). payload contains userid and type

## Bonus Requirements

- sign up page - signup.html. pretty standard, creates a customer (non-admin) user. prompts for username, email, and password
- image uploading during creating games - uploads image to backend then store the image in /client/public/gameimg (serve-static directory), image is optional when creating a game
- search box did five variables (title, platform, categories, years, price) instead of three. more filters, more sophisticated
- bcrypt is used to hash the user’s passwords as a form of encryption. hash password is stored in user table, raw password is stored in a seperate table, assignment2.hash_password
- edit users admin priviledges in admin page. can edit users between customer or admin. cannot edit current logged in user permissions