'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      x: {
        type: Sequelize.INTEGER
      },
      y: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      player: {
        type: Sequelize.INTEGER,
        references: { model: 'Players' , key: 'id' }
      },
      match_id : {
        type: Sequelize.INTEGER,
        references: {model: 'Matches' , key: 'id'}
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plays');
  }
};