const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require("sequelize");

const router = express.Router();

const validateSpotParams = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReviewParams = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// get all spots
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
                where: { preview: true },
                required: false
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
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            [sequelize.col('url'), 'previewImage']
        ],
        group: ['Spot.id'],
    })

    res.json({ "Spots": spots })
});

// get all spots owned by current user
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
                where: { preview: true },
                required: false
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
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            [sequelize.col('url'), 'previewImage']
        ],
        group: ['Spot.id'],
    })

    res.json({ "Spots": spots })
});

// get details of a spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params

    const spot = await Spot.findOne({
        where: { id: spotId },
        include: [
            {
                model: Review,
                attributes: [],
                where: { spotId: spotId },
                required: false
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
                separate: true,
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
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
            [sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
        ],
    })
    if (!spot.id) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
        })
    }
    res.json(spot)
});

// create a new spot
router.post('/', requireAuth, validateSpotParams, async (req, res) => {
    const userId = req.user.id
    if (userId) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newSpot = Spot.build({
            userId: userId,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        })
        await newSpot.save()
        res.status(201).json(newSpot)
    }
});

// add an image to a spot based on spot id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const currUserId = req.user.id
    const { spotId } = req.params
    const { url, preview } = req.body
    const existingSpot = await Spot.findOne({
        where: { id: spotId }
    })

    if (existingSpot) {
        if (currUserId === existingSpot.userId) {

            const newSpotImage = SpotImage.build({
                spotId: spotId,
                url: url,
                preview: preview
            })
            await newSpotImage.save()
            res.json({
                'id': newSpotImage.id,
                'url': newSpotImage.url,
                'preview': newSpotImage.preview
            })
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
        })
    }
});

// edit a spot
router.put('/:spotId', requireAuth, validateSpotParams, async (req, res) => {
    const currUserId = req.user.id
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const existingSpot = await Spot.findByPk(spotId)

    if (existingSpot) {
        if (currUserId === existingSpot.userId) {

            if (address !== undefined) existingSpot.address = address
            if (city !== undefined) existingSpot.city = city
            if (state !== undefined) existingSpot.state = state
            if (country !== undefined) existingSpot.country = country
            if (lat !== undefined) existingSpot.lat = lat
            if (lng !== undefined) existingSpot.lng = lng
            if (name !== undefined) existingSpot.name = name
            if (description !== undefined) existingSpot.description = description
            if (price !== undefined) existingSpot.price = price

            await existingSpot.save()
            res.json(existingSpot)
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
        })
    }
});

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const currUserId = req.user.id
    const { spotId } = req.params
    const existingSpot = await Spot.findByPk(spotId)

    if (existingSpot) {
        if (currUserId === existingSpot.userId) {
            await existingSpot.destroy()
            res.json({
                "message": "Successfully deleted"
            })
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
        })
    }
});

// get all reviews by spot id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params
    const existingSpot = await Spot.findOne({
        where: { id: spotId }
    })
    if (existingSpot) {
        const spotReviews = await existingSpot.getReviews({
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
            }]
        })
        res.json({ "Reviews": spotReviews })
    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
        })
    }
});

// create a review for a spot based on its id
router.post('/:spotId/reviews', requireAuth, validateReviewParams, async (req, res) => {
    const currUserId = req.user.id
    const { spotId } = req.params
    const { review, stars } = req.body
    const existingSpot = await Spot.findOne({
        where: { id: spotId }
    })
    if (existingSpot) {
        const spotReviews = await existingSpot.getReviews()

        spotReviews.forEach(rev => {
            const review = rev.toJSON()
            if (review.userId === currUserId) {
                res.status(500);
                return res.json({
                    "message": "User already has a review for this spot",
                })
            }
            console.log(review)
        })
        // if (existingSpot.userId === currUserId) {
        //     res.status(404);
        //     return res.json({
        //         "message": "Owner of spot cannot leave a review",
        //     })
        // }
        const newReview = Review.build({
            userId: currUserId,
            spotId: spotId,
            review: review,
            stars: stars
        })
        await newReview.save()
        res.status(201).json(newReview)
    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
        })
    }
});


module.exports = router;
