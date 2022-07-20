module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserStocks', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        reference: {
          model: 'User',
          key: 'id',
        },
      },
      stock_code: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      available_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('UserStocks');
  },
};
