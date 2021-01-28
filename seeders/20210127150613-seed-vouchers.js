'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    const vouchers = [
      {
        name_voucher: '5.000',
        price: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_voucher: '10.000',
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_voucher: '20.000',
        price: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_voucher: '50.000',
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_voucher: '100.000',
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  return queryInterface.bulkInsert('Vouchers', vouchers, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return  queryInterface.bulkDelete('Vouchers', null, {});
  }
};
