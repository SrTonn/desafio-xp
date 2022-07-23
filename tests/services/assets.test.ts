import { Stocks } from '../../src/database/models/Stocks';
import { updateAssets, getAssets } from '../../src/services/assets.service'

describe('Test assets service', () => {
  const mockStockList = [{
    stock: "AGRO3",
    name: "BRASILAGRO",
    value: 23.24,
    volume: 53089,
    logo: "https://s3-symbol-logo.tradingview.com/brasilagro--big.svg"
  },
  {
    stock: "AMZO34",
    name: "AMAZON DRN",
    value: 4.05,
    volume: 231163,
    logo: "https://s3-symbol-logo.tradingview.com/amazon--big.svg"
  },
  {
    stock: "ASAI3",
    name: "ASSAI",
    value: 15.53,
    volume: 45609,
    logo: "https://s3-symbol-logo.tradingview.com/assai-on-nm--big.svg"
  }];

  it('Será validado que é possível listar uma ação ao buscar pelo código', async () => {
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(mockStockList[0] as never);

    const response = await getAssets(mockStockList[0].stock);
    expect(response).toEqual(mockStockList[0]);
  });

  it('Será validado que é possível listar todas ações disponíveis no mercado com sucesso', async () => {
    jest.spyOn(Stocks, 'findAll').mockResolvedValue(mockStockList as never);

    const response = await getAssets();
    expect(response).toEqual(mockStockList);
  });

  it('Será validado que é possível atualizar todas ações com sucesso', async () => {
    jest.spyOn(Stocks, 'findAll').mockResolvedValue([] as never);

    const response = await updateAssets();
    expect(response).toBeUndefined();
  });

});
