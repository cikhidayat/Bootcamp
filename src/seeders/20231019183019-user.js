'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Ucup Siregar',
      email: 'ucuplovebutet@gmail.com',
      password: 'root',
      createdAt: '2023-10-20',
      updatedAt: '2023-10-20'
    },
    {
      name: 'Butet Sianipar',
      email: 'butetloveucup@gmail.com',
      password: 'root',
      createdAt: '2023-10-20',
      updatedAt: '2023-10-20'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
