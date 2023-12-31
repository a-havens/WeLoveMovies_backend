//sets local host
const { PORT = 5001 } = process.env;

//requiring app and knex for use in the file
const app = require("./app");
const knex = require("./db/connection");

//listener funtion displaying when server is running
const listener = () => console.log(`Listening on Port ${PORT}!`);

/*
applying any pending migrations to the database to ensure it's up-to-date 
with the latest schema, then logs information about the applied migrations, 
then starts the application,If there is an error during the migration 
process, the catch block is executed, logging the error to the console
*/
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
