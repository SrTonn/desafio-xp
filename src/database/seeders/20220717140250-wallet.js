module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Wallets', [
      {
        user_id: 1,
        balance: 15572.91,
      },
      {
        user_id: 2,
        balance: 1432.98,
      },
      {
        user_id: 3,
        balance: 50000.00,
      },
    ], { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Wallets', null, {});
  },
};
