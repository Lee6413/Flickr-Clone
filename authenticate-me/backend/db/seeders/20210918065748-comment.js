'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Comments', [
       {userId: 2, photoId: 1, content:"Nice1"},
       {userId: 2, photoId: 2, content:"Nice2"},
       {userId: 1, photoId: 3, content:"Nice3"},
       {userId: 1, photoId: 4, content:"Nice4"},
       {userId: 2, photoId: 5, content:"Nice5"},
       {userId: 1, photoId: 6, content:"Nice6"},
     ], {});
    },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
