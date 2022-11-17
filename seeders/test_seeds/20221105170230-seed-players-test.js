const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      nickname: 'user1',
      email: 'user1@uc.cl',
      hash_contrasena: bcrypt.hashSync('123456', 5),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nickname: 'user2',
      email: 'user2@uc.cl',
      hash_contrasena: bcrypt.hashSync('123456', 5),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nickname: 'user3',
      email: 'user3@uc.cl',
      hash_contrasena: bcrypt.hashSync('123456', 5),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};
