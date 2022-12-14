module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      turno: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      player_1: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      player_2: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      current: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Matches');
  },
};
