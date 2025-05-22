'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      price: Sequelize.FLOAT,
      available: { type: Sequelize.BOOLEAN, defaultValue: true },
      image: Sequelize.STRING,
      deletedAt: Sequelize.DATE,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  },
};
