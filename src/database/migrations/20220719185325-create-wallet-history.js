module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WalletHistories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        reference: {
          model: 'User',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('deposit', 'withdraw', 'buyAssets', 'sellAssets'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('WalletHistories');
  },
};
