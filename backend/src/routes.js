import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';
import OrganizerController from './app/controllers/OrganizerController';

import { validateSignIn } from './app/validators/auth';
import { validateCreate, validateUpdate } from './app/validators/profile';

const routes = new Router();

const upload = multer(multerConfig);
routes.get('/users', UserController.index);
routes.post('/users', validateCreate, UserController.store);
routes.post('/sessions', validateSignIn, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', validateUpdate, UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions/:meetupId', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/meetupsByOrganizer', OrganizerController.index);

export default routes;
