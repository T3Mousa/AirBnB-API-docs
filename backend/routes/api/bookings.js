const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReviewParams } = require('./validators')
const { Op } = require("sequelize");

const router = express.Router();

// get all bookings of current user
router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: { userId: userId },
        include: {
            model: Spot,
            include: {
                model: SpotImage,
                attributes: [[sequelize.col('url'), 'previewImage']],
                where: { preview: true },
                required: false
            },
            attributes: [
                'id',
                ['userId', 'ownerId'],
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'price',
            ]
        },
    })
    let bookingsArray = []
    for (let book of bookings) {
        const bookingData = book.toJSON()
        if (!bookingData.Spot.SpotImages[0] || bookingData.Spot.SpotImages === []) {
            bookingData.Spot.previewImage = null
        } else {
            bookingData.Spot.previewImage = bookingData.Spot.SpotImages[0]['previewImage']
        }
        delete bookingData.Spot.SpotImages
        bookingsArray.push(bookingData)
    }
    res.send({ "Bookings": bookingsArray })
});

module.exports = router;
