"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Devices",
      [
        { device_name: "스마트폰", device_id: "abcd1" },
        { device_name: "데스크탑 컴퓨터", device_id: "abcd2" },
        { device_name: "노트북 컴퓨터", device_id: "abcd3" },
        { device_name: "기타", device_id: "abcd4" },
        { device_name: "스마트패드", device_id: "abcd5" }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Devices", null, {});
  }
};
