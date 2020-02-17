require('dotenv').config();

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const {PostgresDB} = require('./db/postgres');
const {Controller} = require('./controllers/ctrl');

const {UserTable} = require('./models/user/postgres');
const {UserModel} = require('./models/user');
const {UserController} = require('./controllers/user');

function main(port) {
    // Set up our Postgres database;
    const postgres = PostgresDB();

    // Creates our express server
    const app = express();
    app.use(compression());
    app.use(morgan('dev'));
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());

    // Tells our server what controllers to use for what endpoints
    const router = express.Router();
    const controller = Controller();
    router.use('/', controller);

    // Sets up our user table, model, and controller
    const userTable = UserTable(postgres);
    userTable.setupTable();
    const userModel = UserModel(userTable);
    const userController = UserController(userModel);
    router.use('/users', userController);

    app.use('/api', router);

    app.listen(port, () => {
        console.log(`listening on port ${port}`); 
    });
}

// Our app will run on localhost at the port specified by our environment
// If we don't specifiy a port, it'll default to port 3000 (arbitrarily chosen)
main(process.env.PORT || 3000);
