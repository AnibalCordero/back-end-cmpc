'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('books', 'genreId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'genres',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('books', 'genreId');
  },
};
