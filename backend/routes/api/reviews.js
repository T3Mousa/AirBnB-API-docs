const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReviewParams } = require('./validators')
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
        // console.log(reviewData)
        if (!reviewData.Spot.SpotImages[0] || reviewData.Spot.SpotImages === []) {
            reviewData.Spot.previewImage = null
        } else {
            reviewData.Spot.previewImage = reviewData.Spot.SpotImages[0]['previewImage']
        }
        // console.log(reviewData.Spot['SpotImages'][0]['previewImage'])
        delete reviewData.Spot.SpotImages
        // console.log(reviewData)
        revArray.push(reviewData)
        // console.log(reviewData)
    }
    // console.log(revArray)
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
            attributes: ['id']
        }
    })
    if (existingReview) {
        console.log(existingReview)
        const existingRevObj = existingReview.toJSON()
        console.log(existingRevObj)
        const numberOfRevImg = existingRevObj.ReviewImages.length
        console.log(existingRevObj.ReviewImages.length)
        if (currUserId === existingReview.userId) {
            if (numberOfRevImg < 10) {
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
                    "message": "Maximum number of images for this resource was reached"
                })
            }
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    }
    if (!existingReview) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
        })
    }
});

// edit a review
router.put('/:reviewId', requireAuth, validateReviewParams, async (req, res) => {
    const currUserId = req.user.id
    const { reviewId } = req.params
    const { review, stars } = req.body
    const existingReview = await Review.findByPk(reviewId)

    if (existingReview) {
        if (currUserId === existingReview.userId) {

            if (review !== undefined) existingReview.review = review
            if (stars !== undefined) existingReview.stars = stars

            await existingReview.save()
            res.json(existingReview)
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

// delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const currUserId = req.user.id
    const { reviewId } = req.params
    const existingReview = await Review.findByPk(reviewId)

    if (existingReview) {
        if (currUserId === existingReview.userId) {
            await existingReview.destroy()
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
            "message": "Review couldn't be found",
        })
    }
});

// delete an exisitng image for a review
router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res) => {
    const currUserId = req.user.id
    const { reviewId, imageId } = req.params
    const existingReview = await Review.findByPk(reviewId)
    if (existingReview) {
        const existingReviewImages = await existingReview.getReviewImages({ where: { id: imageId } })
        const existingReviewImage = existingReviewImages[0]
        if (currUserId === existingReview.userId) {
            await existingReviewImage.destroy()
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
            "message": "Review Image couldn't be found"
        })
    }
});

module.exports = router;
