module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      transaction_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Transaction',
          key: 'id',
        },
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('buy', 'sell'),
        allowNull: false,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Reports');
  },
};
