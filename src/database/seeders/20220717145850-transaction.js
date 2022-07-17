module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      {
        user_id: 1,
        stock_code: 'GOLL4',
      },
      {
        user_id: 2,
        stock_code: 'GOLL4',
      },
      {
        user_id: 3,
        stock_code: 'XPBR31',
      },
      {
        user_id: 3,
        stock_code: 'XPBR31',
      },
    ], { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
