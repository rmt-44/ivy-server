'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is invalid'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password at least 6 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, 10);
  })
  return User;
};