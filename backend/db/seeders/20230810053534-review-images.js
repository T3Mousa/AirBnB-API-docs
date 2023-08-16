'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "/images/review1_1.png"
      },
      {
        reviewId: 1,
        url: "/images/review1_2.png"
      },
      {
        reviewId: 1,
        url: "/images/review1_3.png"
      },
      {
        reviewId: 2,
        url: "/images/review2_1.png"
      },
      {
        reviewId: 3,
        url: "/images/review3_1.png"
      },
      {
        reviewId: 3,
        url: "/images/review1_2.png"
      },
      {
        reviewId: 4,
        url: "/images/review4_1.png"
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
