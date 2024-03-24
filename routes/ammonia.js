const express = require('express');
const router = express.Router();
const Ammonia = require('../models/ammoniaModel');

router.get('/', async (req, res) => {
	try {
		const ammonia = await Ammonia.find();
		res.status(200).json(ammonia);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

router.post('/', async (req, res) => {
	try {
		const { value } = req.body;
		if (!value) res.status(400).json({ message: 'Please provide a value' });

		const ammonia = await Ammonia.create({ value });
		res.status(201).json(ammonia);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

module.exports = router;
