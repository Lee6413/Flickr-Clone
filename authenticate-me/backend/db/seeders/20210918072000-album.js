'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Albums',[
       {userId: 1, title: "Test1"},
       {userId: 2, title: "Test2"},
       {userId: 3, title: "Test3"},
      ] ,{});
    },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Albums', null, {});
  }
};