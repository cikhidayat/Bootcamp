'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('myblogs', [{
      title: 'Javascript Project 2025',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 4,
      html: true,
      css: true,
      javascript: false,
      php: false,
      image: 'project1.jpg',
      createdAt: '2023-10-20',
      updatedAt: '2023-10-20'
    },{
      title: 'React Project 2024',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      duration: 10,
      html: false,
      css: true,
      javascript: true,
      php: false,
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
