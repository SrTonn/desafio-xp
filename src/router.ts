import { Router } from 'express';
import accountController from './controllers/account.controller';
import walletController from './controllers/wallet.controller';
import investmentController from './controllers/investment.controller';

const routers = Router();

routers.use('/account', accountController);
routers.use('/wallet', walletController);
routers.use('/investment', investmentController);

export default routers;
