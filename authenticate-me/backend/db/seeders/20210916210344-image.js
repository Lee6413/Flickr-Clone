'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Images', [
        {userId: 1, imageUrl:'https://upload.wikimedia.org/wikipedia/en/4/41/Monster_hunter_rise_cover.jpg', content: 'Monster Hunter Rise'},
        {userId: 1, imageUrl:'https://upload.wikimedia.org/wikipedia/en/4/4a/Xenoblade_Chronicles_2.jpg', content: 'Xenoblade Chronicles 2'},
        {userId: 2, imageUrl:'https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg', content: 'Super Smash Bros. Ultimate'},
        {userId: 2, imageUrl:'https://upload.wikimedia.org/wikipedia/en/1/16/Fire_Emblem_Three_Houses.jpg', content: 'Fire Emblem: Three Houses'},
        {userId: 3, imageUrl:'https://upload.wikimedia.org/wikipedia/en/6/67/Astral_Chain.jpg', content: 'Astral Chain'},
        {userId: 3, imageUrl:'https://upload.wikimedia.org/wikipedia/en/4/4c/Dragon_Quest_XI_cover_art.jpg', content: 'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition'},
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Images', null, {});

  }
};
