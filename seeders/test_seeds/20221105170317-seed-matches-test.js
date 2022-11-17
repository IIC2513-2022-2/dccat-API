module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Matches', [
    {
      turno: 0,
      player_1: 1,
      player_2: 2,
      current: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turno: 0,
      player_1: 2,
      player_2: 3,
      current: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turno: 0,
      player_1: 1,
      player_2: 2,
      current: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Matches', null, {}),
};