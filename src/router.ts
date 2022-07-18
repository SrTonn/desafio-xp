import { Router } from 'express';
import accountController from './controllers/account.controller';

const routers = Router();

routers.use('/account', accountController);

export default routers;
