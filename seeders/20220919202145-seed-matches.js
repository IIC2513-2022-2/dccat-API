'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Matches', [
    {
      id: 0,
      turno: 0,
      player_1: 0,
      player_2: 1,
      current: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 1,
      turno: 1,
      player_1: 1,
      player_2: 2,
      current: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Matches', null, {});
  }
};
