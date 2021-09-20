'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AlbumPhotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Photos"},
      },
      albumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Albums"},
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    },

    { indexes: [
      {
        name: 'photoAlbumIndex',
        unique: true,
        fields: ['photoId', 'albumId']
      },
    ]
  }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AlbumPhotos');
  }
};
