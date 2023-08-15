const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require("sequelize");

const router = express.Router();

router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const reviews = await Review.findAll({
        where: { userId: userId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']

            },
            {
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
                    'price'
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
    })


    res.json({ "Reviews": reviews })
});


module.exports = router;
