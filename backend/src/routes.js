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

import { validateUserStore, validateUserUpdate } from './app/validators/user';
import {
  validateMeetupStore,
  validateMeetupUpdate,
} from './app/validators/meetup';

const routes = new Router();

const upload = multer(multerConfig);
routes.get('/users', UserController.index);
routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', validateUserUpdate, UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions/:meetupId', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/meetupsByOrganizer', OrganizerController.index);

export default routes;
