module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('UserStocks', [
      {
        user_id: 1,
        stock_code: 'GOLL4',
        available_quantity: 2,
        invested_amount: 16.66,
      },
      {
        user_id: 2,
        stock_code: 'GOLL4',
        available_quantity: 5,
        invested_amount: 41.65,
      },
      {
        user_id: 3,
        stock_code: 'XPBR31',
        available_quantity: 2,
        invested_amount: 197.72,
      },
    ], {
      updateOnDuplicate: ['user_id', 'stock_code', 'available_quantity', 'invested_amount'],
      timestamps: false,
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('UserStocks', null, {});
  },
};
