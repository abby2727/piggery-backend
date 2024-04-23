const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const cors = require('cors');
const webpush = require('web-push');

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

//* Home Route
app.get('/', (req, res) => {
	res.send('Piggery Backend API');
});

const humidityRouter = require('./routes/humidity');
const temperatureRouter = require('./routes/temperature');
const ammoniaRouter = require('./routes/ammonia');
const subscriptionRouter = require('./routes/subscription');

app.use('/api/humidity', humidityRouter);
app.use('/api/temperature', temperatureRouter);
app.use('/api/ammonia', ammoniaRouter);
app.use('/api', subscriptionRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
