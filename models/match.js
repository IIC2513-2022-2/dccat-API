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
      this.belongsTo(models.Player, {
        as:'player1',
        foreignKey: 'player_1'
      });
      this.belongsTo(models.Player, {
        as:'player2',
        foreignKey: 'player_2'
      });
      this.belongsTo(models.Player, {
        as: 'currentPlayer',
        foreignKey: 'current'
      });
      this.hasMany(models.Play, {
        foreignKey: 'match_id'
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