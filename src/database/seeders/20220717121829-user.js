module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'doe@john',
      },
      {
        first_name: 'Tiffany',
        last_name: 'Pena',
        email: 'tiffany.pena@gmail.com',
        password: 'Pena@Tiffany',
      },
      {
        first_name: 'Ollie',
        last_name: 'Bryant',
        email: 'ollie.bryant@gmail.com',
        password: 'Bryant@Ollie',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
