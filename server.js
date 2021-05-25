const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const admin = require('./routes/admin');
const client = require('./routes/client');
const employee = require('./routes/employees');
const login = require('./routes/login');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use('/api/login', login);
app.use('/api/admin', admin);
app.use('/api/client', client);
app.use('/api/employee', employee);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port = process.env.PORT || 8080;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
