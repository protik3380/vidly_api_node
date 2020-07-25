const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
// console.log(config.jwtPrivateKey);
// console.log(config.get('jwtPrivateKey'));

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR : jwtPrivateKey is not define .');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/vidly')
.then(()=>console.log('Connencted to mongodb ....'))
.catch(err=>console.error('Could not connect to mongodb .....'));

app.use(express.json());

app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);


const port = process.env.PORT || 4100;
app.listen(port,()=>
console.log(`Listening on port ${port} ....`)
);