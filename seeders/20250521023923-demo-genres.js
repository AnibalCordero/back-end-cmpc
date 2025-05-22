'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('genres', [
      { name: 'Ficción', createdAt: new Date(), updatedAt: new Date() },
      { name: 'No Ficción', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ciencia Ficción', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
