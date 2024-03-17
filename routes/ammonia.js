const express = require('express');
const router = express.Router();
const Ammonia = require('../models/ammoniaModel');

// Function to format timestamp to 'yyyy-MM-dd HH:mm:ss'
function formatDate(timestamp) {
	if (!timestamp) return null;
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const hours = ('0' + date.getHours()).slice(-2);
	const minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = ('0' + date.getSeconds()).slice(-2);
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

router.get('/', async (req, res) => {
	try {
		const ammonia = await Ammonia.find().lean();
		const formattedAmmonia = ammonia.map((item) => ({
			...item,
			createdAt: formatDate(item.createdAt),
			updatedAt: formatDate(item.updatedAt)
		}));

		res.status(200).json(formattedAmmonia);
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
