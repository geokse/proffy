import express, { response } from 'express';
import ClassesControler from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionController';

const routes = express.Router();

const classesControlers = new ClassesControler();
const connectionsControler = new ConnectionsController();

routes.get('/classes', classesControlers.index);
routes.post('/classes', classesControlers.create);

routes.get('/connections', connectionsControler.index);
routes.post('/connections', connectionsControler.create);

export default routes;
