'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('authors', [
      {
        name: 'Gabriel García Márquez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Isabel Allende',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mario Vargas Llosa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('authors', null, {});
  },
};
