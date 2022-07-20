module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Stocks', [
      {
        stock: 'AMZO34',
        name: 'AMAZON DRN',
        value: 4.05,
        volume: 231243,
        logo: 'https://s3-symbol-logo.tradingview.com/amazon--big.svg',
      },
      {
        stock: 'XPBR31',
        name: 'XP INC DR1',
        value: 98.86,
        volume: 512093,
        logo: 'https://s3-symbol-logo.tradingview.com/xp--big.svg',
      },
      {
        stock: 'AGRO3',
        name: 'BRASILAGRO',
        value: 23.24,
        volume: 53089,
        logo: 'https://s3-symbol-logo.tradingview.com/brasilagro--big.svg',
      },
      {
        stock: 'MGLU3',
        name: 'MAGAZINE LUIZA',
        value: 2.74,
        volume: 203915,
        logo: 'https://s3-symbol-logo.tradingview.com/magaz-luiza-on-nm--big.svg',
      },
      {
        stock: 'MSFT34',
        name: 'MICROSOFT DRN',
        value: 58.13,
        volume: 409332,
        logo: 'https://s3-symbol-logo.tradingview.com/microsoft--big.svg',
      },
      {
        stock: 'QUAL3',
        name: 'QUALICORP',
        value: 10.41,
        volume: 58923,
        logo: 'https://s3-symbol-logo.tradingview.com/qualicorp-on-nm--big.svg',
      },
      {
        stock: 'ASAI3',
        name: 'ASSAI',
        value: 15.53,
        volume: 45609,
        logo: 'https://s3-symbol-logo.tradingview.com/assai-on-nm--big.svg',
      },
      {
        stock: 'TPIS3',
        name: 'TRIUNFO PARTON',
        value: 1.25,
        volume: 45389,
        logo: 'https://brapi.dev/favicon.svg',
      },
      {
        stock: 'SBFG3',
        name: 'GRUPO SBF',
        value: 18.04,
        volume: 62893,
        logo: 'https://s3-symbol-logo.tradingview.com/grupo-sbf-on-nm--big.svg',
      },
      {
        stock: 'GOGL34',
        name: 'ALPHABET DRN A',
        value: 4.04,
        volume: 35464,
        logo: 'https://s3-symbol-logo.tradingview.com/alphabet--big.svg',
      },
      {
        stock: 'BOAS3',
        name: 'BOA VISTA',
        value: 5.17,
        volume: 94289,
        logo: 'https://s3-symbol-logo.tradingview.com/boa-vista-on-nm--big.svg',
      },
      {
        stock: 'NVDC34',
        name: 'NVIDIA CORP DRN',
        value: 19.15,
        volume: 91289,
        logo: 'https://s3-symbol-logo.tradingview.com/nvidia--big.svg',
      },
      {
        stock: 'OPCT3',
        name: 'OCEANPACT',
        value: 1.64,
        volume: 89512,
        logo: 'https://brapi.dev/favicon.svg',
      },
      {
        stock: 'GOLL4',
        name: 'GOL PN',
        value: 8.33,
        volume: 66542,
        logo: 'https://s3-symbol-logo.tradingview.com/gol-linhas-aereas-inteligentes--big.svg',
      },
    ], { updateOnDuplicate: ['stock', 'name', 'value', 'logo', 'volume'] });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Stocks', null, {});
  },
};
