import * as express from 'express';
import * as cors from 'cors';
import * as functions from 'firebase-functions';

import { firebase } from './firebase';
import breedsRoutes from './routes/breedsRoutes';

// express app configuration
const app = express();
app.use(cors({ origin: '*' }));

// register routes
breedsRoutes(app, firebase);

export const api = functions.https.onRequest(app);
