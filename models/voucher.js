'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsToMany(models.User, {
        through: models.Transaction
      })
    }
    rupiah(){
      return `Rp. ${this.name_voucher}`
    }
  };
  Voucher.init({
    name_voucher: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'nama voucher tidak boleh kosong'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'price tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};