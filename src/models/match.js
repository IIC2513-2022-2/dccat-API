'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Player, {
        foreignKey: 'player_1',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Player, {
        foreignKey: 'player_1',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Player, {
        foreignKey: 'player_2',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Player, {
        foreignKey: 'current_player_1',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Player, {
        foreignKey: 'current_player_2',
        onDelete: 'CASCADE'
      });
    }
  }
  Match.init({
    turno: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};