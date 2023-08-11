'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: "2023-12-01",
        endDate: "2023-12-10"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-11-23",
        endDate: "2023-11-30"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-12-09",
        endDate: "2023-12-15"
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2023-12-01",
        endDate: "2023-12-10"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-12-31",
        endDate: "2024-01-08"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2023-11-01",
        endDate: "2023-11-10"
      },
      {
        spotId: 4,
        userId: 1,
        startDate: "2023-12-01",
        endDate: "2023-12-10"
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
