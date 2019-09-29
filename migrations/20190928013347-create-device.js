"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Devices", {
      device_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      device_name: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Devices");
  }
};
