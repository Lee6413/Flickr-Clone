1. Clone this repository
2. cd into the repository
3. npm install to install dependencies
4. Create a .env file using the .env.example as a guide
5. Create a database user in your local Postgres database based off the information you provided in the .env file, make sure that your new user has createdb privileges
6. Run npx dotenv sequelize db:create
7. Run npx dotenv sequelize db:migrate
8. Run npx dotenv sequelize db:seed:all
9. Run npm start to start the application
