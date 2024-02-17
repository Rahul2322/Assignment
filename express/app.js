require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 8000
const user = require('./routes/user');
const {errorMiddleware}  = require('./middlewares/error')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

//routes
app.use('/api',user)

app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
}

module.exports = app;