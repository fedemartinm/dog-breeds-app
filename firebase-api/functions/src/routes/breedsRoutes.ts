import { Application } from 'express';
import { BreedsRepository } from '../database/breedsCollection';
import { FirebaseApp, logger } from '../firebase';

/**
 * Breeds API
 */
export default (app: Application, firebase: FirebaseApp) => {
    const breedsRepository = new BreedsRepository(firebase);

    // get breeds from firestore collection
    app.get('/breeds', (req, res) => {
        breedsRepository
            .getAll()
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(error => {
                logger.error(error);
                res.status(500);
                res.send();
            });
    });

    // get specific breed from firestore collection
    app.get('/breeds/:id', (req, res) => {
        breedsRepository
            .get(req.params.id)
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(error => {
                logger.error(error);
                res.status(500);
                res.send();
            });
    });

    // add new breed to collection
    app.post('/breeds', (req, res) => {
        if (typeof req.body.name !== 'string' && req.body.name) {
            res.status(400);
        } else {
            breedsRepository
                .create(req.body)
                .then(data => {
                    res.status(200);
                    res.json(data);
                })
                .catch(error => {
                    logger.error(error);
                    res.status(500);
                    res.send();
                });
        }
    });

    // update entry
    app.put('/breeds', (req, res) => {
        if (typeof req.body.name !== 'string' && req.body.name) {
            res.status(400);
        } else {
            breedsRepository
                .update(req.body)
                .then(data => {
                    res.status(200);
                    res.json(data);
                })
                .catch(error => {
                    logger.error(error);
                    res.status(500);
                    res.send();
                });
        }
    });

    // delete breed by id
    app.delete('/breeds/:id', (req, res) => {
        breedsRepository
            .delete(req.params.id)
            .then(() => {
                res.status(200);
                res.send();
            })
            .catch(error => {
                logger.error(error);
                res.status(500);
                res.send();
            });
    });
};
