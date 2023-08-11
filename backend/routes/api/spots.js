const express = require('express');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');
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



module.exports = router;
