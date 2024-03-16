const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

app.get('/', (req, res) => {
	res.send('Piggery Backend API');
});

const humidityRouter = require('./routes/humidity');
const temperatureRouter = require('./routes/temperature');

app.use('/api/humidity', humidityRouter);
app.use('/api/temperature', temperatureRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
