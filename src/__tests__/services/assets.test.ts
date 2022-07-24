import { Stocks } from '../../database/models/Stocks';
import { updateAssets, getAssets } from '../../services/assets.service';

describe('Test assets service', () => {
  it('Será validado que é possível listar uma ação ao buscar pelo código!!!', async () => {
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stockList[0] as never);

    const response = await getAssets(mockStockList[0].stock);
    expect(response).toEqual(mockStockList[0]);
  });

  it(
    'Será validado que é possível listar todas ações disponíveis no mercado com sucesso',
    async () => {
      jest.spyOn(Stocks, 'findAll').mockResolvedValue(mockStockList as never);

      const response = await getAssets();
      expect(response).toEqual(mockStockList);
    },
  );

  it('Será validado que é possível atualizar todas ações com sucesso', async () => {
    jest.spyOn(Stocks, 'findAll').mockResolvedValue([] as never);

    const response = await updateAssets();
    expect(response).toBeUndefined();
  });
});
