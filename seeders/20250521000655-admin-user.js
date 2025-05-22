'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@cmpc.cl',
        name: 'test admin',
        password: hashed,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@cmpc.cl' }, {});
  },
};
