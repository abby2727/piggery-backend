const express = require('express');
const router = express.Router();
const Temperature = require('../models/temperatureModel');

router.get('/', async (req, res) => {
	try {
		const temperature = await Temperature.find();
		res.status(200).json(temperature);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

router.post('/', async (req, res) => {
	try {
		const { value } = req.body;
		if (!value) res.status(400).json({ message: 'Please provide a value' });

		const temperature = await Temperature.create({ value });
		res.status(201).json(temperature);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

module.exports = router;
