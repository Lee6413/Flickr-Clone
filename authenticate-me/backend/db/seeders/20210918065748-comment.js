'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Comments', [
       {userId: 2, imageId: 1, comment:"Nice1"},
       {userId: 3, imageId: 2, comment:"Nice2"},
       {userId: 3, imageId: 3, comment:"Nice3"},
       {userId: 1, imageId: 4, comment:"Nice4"},
       {userId: 2, imageId: 5, comment:"Nice5"},
       {userId: 1, imageId: 6, comment:"Nice6"},
     ], {});
    },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
