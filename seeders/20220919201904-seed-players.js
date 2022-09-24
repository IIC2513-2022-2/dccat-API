module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      id: 0,
      nickname: 'maquinapalgato',
      email: 'ian@gmail.com',
      hash_contrasena: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      nickname: 'geniogatoplayer',
      email: 'pedro@gmail.com',
      hash_contrasena: 'abc123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      nickname: 'maomenogatoaficionado',
      email: 'tomas@gmail.com',
      hash_contrasena: 'abuelita1512',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};
