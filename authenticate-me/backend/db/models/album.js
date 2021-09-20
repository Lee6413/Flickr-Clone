'use strict';
const { User } = require("./album");
const { AlbumPhoto } = require("./albumphoto");
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 120],
      }
    },
    description: DataTypes.STRING,
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, { foreignKey: 'userId',  hooks: true });
    Album.hasMany(models.AlbumPhoto, { foreignKey: 'albumId', onDelete: 'cascade',  hooks: true });
  };
  return Album;
};
