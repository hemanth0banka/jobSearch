const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const sequelize = require('./util/db.js');
const signInUp = require('./routes/signInUp.js')
const profile = require('./routes/userprofile.js')
const appliedjobs = require('./routes/myJobApplications.js')
const companies = require('./routes/companies.js')
const reminder = require('./routes/reminder.js')
const uploads = require('./routes/uploads.js')
const tokenValidator = require('./middlewares/tokenValidator.js')
const errorHandler = require('./middlewares/errorHandler.js')
const port = process.env.PORT || 3000;
require('./jobs/cronJob.js')
require('./model/model.js')
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'pages', 'login.html'))
});
app.use('/user', signInUp)
app.get('/home', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'pages', 'home.html'))
})
app.use(tokenValidator.validate)
app.use('/api/user', profile)
app.use('/api/applied', appliedjobs)
app.use('/api/companies', companies)
app.use('/api/reminder', reminder)
app.use('/api/uploads', uploads)
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.statusCode = 404;
    next(error);
});
app.use(errorHandler);
(async () => {
    try {
        await sequelize.sync({ alter: true })
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`)
        })
    }
    catch (e) {
        console.log(e)
    }
})();