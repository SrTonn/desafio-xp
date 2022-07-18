module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'nick_name',
      {
        type: Sequelize.STRING,
        after: 'id',
      },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn(
      'Users',
      'nick_name',
    );
  },
};
