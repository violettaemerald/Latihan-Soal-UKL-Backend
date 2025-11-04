'use strict';
let md5 = require('md5')
const now = new Date()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: "Jeff Buckley",
        username: "jeffbuckley1997",
        password: md5("lysco@1997"),
        role: "admin",
        createdAt: now,
        updatedAt: now
      }, {
        name: "Lana Del Rey",
        username: "Ddelreyy",
        password: md5("LDRya?"),
        role: "siswa",
        createdAt: now,
        updatedAt: now
      }, {
        name: "Adrianne Lenker",
        username: "partofbigthief",
        password: md5("ohindigo"),
        role: "siswa",
        createdAt: now,
        updatedAt: now
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
