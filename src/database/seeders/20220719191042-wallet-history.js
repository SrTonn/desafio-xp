module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('WalletHistories', [
      {
        user_id: 3,
        value: 20000,
        type: 1,
      },
      {
        user_id: 1,
        value: 15572.91,
        type: 1,
      },
      {
        user_id: 2,
        value: 1432.98,
        type: 1,
      },
      {
        user_id: 3,
        value: 10000,
        type: 1,
      },
      {
        user_id: 3,
        value: 20000,
        type: 1,
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('WalletHistories', null, {});
  },
};
