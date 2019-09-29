"use strict";

module.exports = (sequelize, DataTypes) => {
  const YearUsage = sequelize.define(
    "YearUsage",
    {
      device_id: {
        allowNull: false,
        type: DataTypes.UUID
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    },
    { timestamps: false }
  );

  YearUsage.associate = function(models) {
    YearUsage.belongsTo(models.Device, {
      foreignKey: "device_id",
      targetKey: "device_id"
    });
  };

  return YearUsage;
};
