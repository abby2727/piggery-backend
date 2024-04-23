const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const webpush = require('web-push');

const Ammonia = require('../models/ammoniaModel');
const Subscription = require('../models/subscriptionModel');

router.get('/', async (req, res) => {
	try {
		const ammonia = await Ammonia.find();
		const formattedAmmonia = ammonia.map((doc) => {
			return {
				...doc._doc,
				createdAt: moment(doc.createdAt)
					.tz('Asia/Manila')
					.format('YYYY-MM-DD HH:mm:ss'),
				updatedAt: moment(doc.updatedAt)
					.tz('Asia/Manila')
					.format('YYYY-MM-DD HH:mm:ss')
			};
		});
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

		//* Send notification if ammonia level is above 25
		if (value > 25) {
			console.log('Ammonia level is above normal.');

			const subscriptions = await Subscription.find();
			const notifications = subscriptions.map((subscription) =>
				webpush.sendNotification(
					subscription,
					'Ammonia level is above normal.'
				)
			);

			await Promise.all(notifications);
		}

		const ammonia = await Ammonia.create({ value });
		res.status(201).json(ammonia);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

module.exports = router;
