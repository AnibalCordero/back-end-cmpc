'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('books', 'editorialId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'editorials',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('books', 'editorialId');
  },
};
