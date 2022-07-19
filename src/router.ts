import { Router } from 'express';
import accountController from './controllers/account.controller';
import walletController from './controllers/wallet.controller';

const routers = Router();

routers.use('/account', accountController);
routers.use('/wallet', walletController);

export default routers;
