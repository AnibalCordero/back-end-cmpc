'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('books', 'authorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('books', 'authorId');
  },
};
