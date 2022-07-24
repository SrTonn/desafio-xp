import { Stocks } from '../../database/models/Stocks';
import { updateAssets, getAssets } from '../../services/assets.service';
import * as Mock from '../mocks';

describe('Test assets service', () => {
  it('Será validado que é possível listar uma ação ao buscar pelo código!!!', async () => {
    jest.spyOn(Stocks, 'findOne').mockResolvedValue(Mock.stockList[0] as never);

    const response = await getAssets(Mock.stockList[0].stock);
    expect(response).toEqual(Mock.stockList[0]);
  });

  it(
    'Será validado que é possível listar todas ações disponíveis no mercado com sucesso',
    async () => {
      jest.spyOn(Stocks, 'findAll').mockResolvedValue(Mock.stockList as never);

      const response = await getAssets();
      expect(response).toEqual(Mock.stockList);
    },
  );

  it('Será validado que é possível atualizar todas ações com sucesso', async () => {
    jest.spyOn(Stocks, 'findAll').mockResolvedValue([] as never);

    const response = await updateAssets();
    expect(response).toBeUndefined();
  });
});
