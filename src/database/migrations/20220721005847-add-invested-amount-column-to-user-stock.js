module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'UserStocks',
      'invested_amount',
      {
        type: Sequelize.DECIMAL(10, 2),
      },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn(
      'UserStocks',
      'invested_amount',
    );
  },
};
