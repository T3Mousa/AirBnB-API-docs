'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 3,
        review: "Great space, beautiful views",
        stars: 5
      },
      {
        userId: 1,
        spotId: 4,
        review: "Great host, very attentive. Will return.",
        stars: 4
      },
      {
        userId: 2,
        spotId: 1,
        review: "Great space, but needs cleaning",
        stars: 2
      },
      {
        userId: 2,
        spotId: 2,
        review: "Worst place ever! DO NOT BOOK!",
        stars: 1
      },
      {
        userId: 3,
        spotId: 1,
        review: "Nice space, but not a great place to relax.",
        stars: 4
      },
      {
        userId: 2,
        spotId: 4,
        review: "It was nice. I may or may not book again.",
        stars: 3
      },
      {
        userId: 3,
        spotId: 2,
        review: "Not as exciting as nice as I thought it would be. Disappointed.",
        stars: 2
      },
      {
        userId: 3,
        spotId: 3,
        review: "I really liked it, but neighbors too loud.",
        stars: 4
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
