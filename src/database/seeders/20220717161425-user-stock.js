module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('UserStocks', [
      {
        user_id: 1,
        stock_code: 'GOLL4',
        available_quantity: 2,
      },
      {
        user_id: 2,
        stock_code: 'GOLL4',
        available_quantity: 5,
      },
      {
        user_id: 3,
        stock_code: 'XPBR31',
        available_quantity: 2,
      },
    ], { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('UserStocks', null, {});
  },
};
