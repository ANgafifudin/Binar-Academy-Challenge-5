'use strict';

const bcrypt = require("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name:"Aji",
        email: "aji@gmail.com",
        password: await bcrypt.hash("Aji", 10),
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
