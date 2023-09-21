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
        url: "https://www.decorilla.com/online-decorating/wp-content/uploads/2020/07/Shabby-chic-house-bedroom-design-inside.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.ytimg.com/vi/zumJJUL_ruM/maxresdefault.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://www.decorilla.com/online-decorating/wp-content/uploads/2020/07/Shabby-chic-house-bedroom-design-inside.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.thespruce.com/thmb/asM4rLR5OHkPWIxmhM77P3xYWbo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beautiful-bathrooms-ideas-4101846-hero-e436124be1664154b7771e3b0d23676f.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/4/20/0/HUHH2022_Amazing%20Kitchens_Greenwich-CT-Estate-06.jpg.rend.hgtvcom.616.411.suffix/1650498253351.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://cdn.mos.cms.futurecdn.net/4qjpYy5VUasusayNynsGg7-1200-80.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://media.houseandgarden.co.uk/photos/6467566f4e4af39a14447a84/1:1/w_1600%2Cc_limit/_74A8994.jpg",
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
