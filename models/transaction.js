'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'user id tidak boleh kosong'
        }
      }
    },
    VoucherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'voucher id tidak boleh kosong'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: {
          msg: 'qty tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};