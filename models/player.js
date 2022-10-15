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
      this.belongsToMany(models.Match, {
        through: 'MatchPlayers',
        as: 'Matches',
      });
      this.hasMany(models.Match, {
        foreignKey: 'player_1',
      });
      this.hasMany(models.Match, {
        foreignKey: 'player_2',
      });
      this.hasOne(models.Match, {
        as: 'current_player',
        foreignKey: 'current',
      });
      this.hasMany(models.Session, {
        foreignKey: 'id',
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
