'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('myblogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duration: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      html: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      css: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      javascript: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      php: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('myblogs');
  }
};