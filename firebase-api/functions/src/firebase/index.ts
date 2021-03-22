import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const config = functions.config().firebase;

export const firebase = admin.initializeApp(config);

export const logger = functions.logger;

export type FirebaseApp = typeof firebase;

export type Collection<T> = FirebaseFirestore.CollectionReference<T>;
