const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require("sequelize");

const router = express.Router();


// get all reviews of current user
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
                    'price',
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
    })
    let revArray = []
    for (let rev of reviews) {
        const reviewData = rev.toJSON()
        reviewData.Spot.previewImage = reviewData.Spot.SpotImages[0].previewImage
        console.log(rev.Spot['SpotImages'][0].previewImage)
        delete reviewData.Spot.SpotImages
        // console.log(reviewData)
        revArray.push(reviewData)
    }
    res.send({ "Reviews": revArray })
});


// add an image to a review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const currUserId = req.user.id
    const { reviewId } = req.params
    const { url } = req.body
    const existingReview = await Review.findOne({
        where: { id: reviewId },
        include: {
            model: ReviewImage,
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('url')), 'numRevImages']
            ]
        }
    })
    const existingRevObj = existingReview.toJSON()
    // console.log(existingRevObj.ReviewImages[0].numRevImages)

    if (existingReview) {
        if (currUserId === existingReview.userId) {
            if (existingRevObj.ReviewImages[0].numRevImages > 10) {
                res.status(403)
                return res.json({
                    "message": "Maximum number of images for this resource was reached"
                })
            }
            const newReviewImage = ReviewImage.build({
                reviewId: reviewId,
                url: url
            })
            await newReviewImage.save()
            res.json({
                'id': newReviewImage.id,
                'url': newReviewImage.url
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
            "message": "Review couldn't be found",
        })
    }
});




module.exports = router;
