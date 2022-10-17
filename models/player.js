const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Play, {
        foreignKey: 'player',
      });
      this.hasMany(models.Match, {
        foreignKey: 'player_1',
        as: 'matchesPlayer1',
      });
      this.hasMany(models.Match, {
        foreignKey: 'player_2',
        as: 'matchesPlayer2',
      });
      this.hasOne(models.Match, {
        as: 'current_player',
        foreignKey: 'current',
      });
    }
  }
  Player.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_contrasena: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
