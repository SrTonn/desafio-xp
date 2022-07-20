module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Stocks',
      'volume',
      {
        type: Sequelize.INTEGER,
        after: 'value',
      },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn(
      'Stocks',
      'volume',
    );
  },
};
