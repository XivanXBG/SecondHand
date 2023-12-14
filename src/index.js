const express = require('express');
const expressConfig = require('./configs/expressConfig')
const handleBarsConfig = require('./configs/handleBarsConfig')
const dbConnect = require('./configs/dbConfig')
const routes = require('./router')
const { PORT } = require('./constants')



const app = express();


//Differenct configs
handleBarsConfig(app);
expressConfig(app);

//Connection to DB
dbConnect()
    .then(() => console.log("Successfullly connected to DB"))
    .catch((err) => console.log(`Error while connecting in DB: ${err}`))


// //Routing
app.use(routes);

//Listening on port
app.listen(PORT, () => { console.log(`Server is listening on port: ${PORT}...`); })