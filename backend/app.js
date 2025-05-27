const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(morgan('dev)) = logging for debugging

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);

module.exports = app;
