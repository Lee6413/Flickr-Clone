'use strict';
module.exports = (sequelize, DataTypes) => {
  const album - photo = sequelize.define('album-photo', {
    photoId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  album - photo.associate = function(models) {
    // associations can be defined here
  };
  return album - photo;
};