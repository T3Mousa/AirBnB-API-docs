const express = require('express');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

const router = express.Router();


router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: [],
                where: { preview: true }
            }
        ],
        attributes: [
            "id",
            ["userId", "ownerId"],
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage']
        ],
        group: ['Spot.id'],
    })

    res.json({ "Spots": spots })
});

router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spots = await Spot.findAll({
        where: { userId: userId },
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: [],
                where: { preview: true }
            }
        ],
        attributes: [
            "id",
            ["userId", "ownerId"],
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage']
        ],
        group: ['Spot.id'],
    })

    res.json({ "Spots": spots })
});

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params

    const options = {
        include: [
            {
                model: Review,
                attributes: [],
                where: { spotId: spotId },
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('Reviews.stars')), 'numReviews']
                ]
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }
            // {
            //     model: User,
            //     as: 'Owner',
            //     attributes: ['id', 'firstName', 'lastName']
            // }
        ]
    }

    const spot = await Spot.findByPk(spotId, options)


    res.json(spot)
});

module.exports = router;
