module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      id: 0,
      nickname: 'maquinapalgato',
      email: 'ian@gmail.com',
      hash_contrasena: '$2a$05$SACLXRMH91S7sjRTYYzGHu0n.KibLlTn2kErduWp7W8rdJCwlz812',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      nickname: 'geniogatoplayer',
      email: 'pedro@gmail.com',
      hash_contrasena: '$2a$05$eMkEHcAHGJdLPlQom/A0MuUoTCOYSbU.lPrw79dZWohfwhrrMlE4C',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      nickname: 'maomenogatoaficionado',
      email: 'tomas@gmail.com',
      hash_contrasena: '$2a$05$rSy1T5BQifkexk1dkR/IRuSv4CY7qi7gY0LiPcglphoib1kN/p.bK',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};
