'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('editorials', [
      { name: 'Planeta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alfaguara', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Random House', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('editorials', null, {});
  },
};
