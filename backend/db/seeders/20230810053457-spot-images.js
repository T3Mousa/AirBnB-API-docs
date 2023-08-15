'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "/images/spot1_1.png",
        preview: false
      },
      {
        spotId: 1,
        url: "/images/spot1_2.png",
        preview: false
      },
      {
        spotId: 1,
        url: "/images/spot1_3.png",
        preview: true
      },
      {
        spotId: 1,
        url: "/images/spot1_4.png",
        preview: false
      },
      {
        spotId: 1,
        url: "/images/spot1_5.png",
        preview: false
      },
      {
        spotId: 2,
        url: "/images/spot2_1.png",
        preview: true
      },
      {
        spotId: 2,
        url: "/images/spot2_2.png",
        preview: false
      },
      {
        spotId: 3,
        url: "/images/spot3_1.png",
        preview: true
      },
      {
        spotId: 3,
        url: "/images/spot3_2.png",
        preview: false
      },
      {
        spotId: 4,
        url: "/images/spot4_1.png",
        preview: false
      },
      {
        spotId: 4,
        url: "/images/spot4_2.png",
        preview: true
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};