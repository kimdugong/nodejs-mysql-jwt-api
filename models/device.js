"use strict";

module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "Device",
    {
      device_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true
      },
      device_name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );

  Device.associate = function(models) {
    Device.hasMany(models.YearUsage, {
      foreignKey: "device_id",
      sourceKey: "device_id"
    });
  };

  return Device;
};
