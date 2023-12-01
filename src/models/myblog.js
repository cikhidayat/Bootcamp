'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myblog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  myblog.init({
    title: DataTypes.STRING,
    author: DataTypes.INTEGER,
    description: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    duration: DataTypes.NUMBER,
    html: DataTypes.BOOLEAN,
    css: DataTypes.BOOLEAN,
    javascript: DataTypes.BOOLEAN,
    php: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'myblog',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  });
  return myblog;
};