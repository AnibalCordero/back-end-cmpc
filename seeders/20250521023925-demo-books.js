'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [
      {
        title: 'Cien años de soledad',
        authorId: 1,
        editorialId: 1,
        genreId: 1,
        price: 14990,
        available: true,
        image: '/public/images/books/base.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  },
};
