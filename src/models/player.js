'use strict';
const {
  Model
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
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Match, {
        foreignKey: 'player_2',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Match, {
        foreignKey: 'player_2',
        onDelete: 'CASCADE'
      });
      this.hasOne(models.Match, {
        foreignKey: 'current_player_1',
        onDelete: 'CASCADE'
      });
      this.hasOne(models.Match, {
        foreignKey: 'current_player_2',
        onDelete: 'CASCADE'
      });
    }
  }
  Player.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_contrasena: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};