'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Photos', [
        {userId: 1, title: 'Monster Hunter Rise',imageUrl:'https://upload.wikimedia.org/wikipedia/en/4/41/Monster_hunter_rise_cover.jpg', description: 'test123'},
        {userId: 1, title: 'Xenoblade Chronicles 2',imageUrl:'https://upload.wikimedia.org/wikipedia/en/4/4a/Xenoblade_Chronicles_2.jpg', description: 'test123'},
        {userId: 2, title: 'Super Smash Bros. Ultimate',imageUrl:'https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg', description: 'test123'},
        {userId: 2, title: 'Fire Emblem: Three Houses',imageUrl:'https://upload.wikimedia.org/wikipedia/en/1/16/Fire_Emblem_Three_Houses.jpg', description: 'test123'},
        {userId: 2, title: 'Astral Chain',imageUrl:'https://upload.wikimedia.org/wikipedia/en/6/67/Astral_Chain.jpg', description: 'test123'},
        {userId: 2, title: 'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition',imageUrl:'https://upload.wikimedia.org/wikipedia/en/4/4c/Dragon_Quest_XI_cover_art.jpg', description: 'test123'},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {});

  }
};
