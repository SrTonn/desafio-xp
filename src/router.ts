import { Router } from 'express';
import loginController from './controllers/login.controller';

const routers = Router();

routers.use('/login', loginController);

export default routers;
