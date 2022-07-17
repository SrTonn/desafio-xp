module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Reports', [
      {
        transaction_id: 1,
        quantity: 2,
        type: 1,
        value: 10,
      },
      {
        transaction_id: 2,
        quantity: 5,
        type: 1,
        value: 5,
      },
      {
        transaction_id: 3,
        quantity: 5,
        type: 1,
        value: 282.93,
      },
      {
        transaction_id: 4,
        quantity: 5,
        type: 2,
        value: 94.31,
      },
    ], { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Reports', null, {});
  },
};
