'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('myblogs', [{
      title: 'Javascript Project 2025',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      startDate: '2023-10-10',
      endDate: '2024-11-20',
      duration: 4,
      html: "fa-brands fa-html5",
      css: "fa-brands fa-css3-alt",
      javascript: '',
      php: '',
      image: 'project1.jpg',
      createdAt: '2023-10-20',
      updatedAt: '2023-10-20'
    },{
      title: 'React Project 2024',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      startDate: '2022-10-10',
      endDate: '2023-11-20',
      duration: 10,
      html: '',
      css: '',
      javascript: "fa-brands fa-js",
      php: "fa-brands fa-php",
      image: 'project3.jpg',
      createdAt: '2023-10-20',
      updatedAt: '2023-10-20'
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('myblogs', null, {});
  }
};
