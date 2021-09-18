'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, {foreignKey: "userId"})
    Image.belongsTo(models.Album, {foreignKey: "albumId"})
    Image.hasMany(models.Comment, {foreignKey: "photoId"})
  };
  return Image;
};
