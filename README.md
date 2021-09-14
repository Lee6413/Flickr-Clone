Clone this repository
cd into the repository
npm install to install dependencies
Create a .env file using the .env.example as a guide
Create a database user in your local Postgres database based off the information you provided in the .env file, make sure that your new user has createdb privileges
Run npx dotenv sequelize db:create
Run npx dotenv sequelize db:migrate
Run npx dotenv sequelize db:seed:all
Run npm start to start the application
