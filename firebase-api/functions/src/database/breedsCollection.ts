import { Breed, Repository } from 'common';
import { Collections } from './collections';
import { FirebaseApp, Collection } from '../firebase';

/**
 *  Abstraction to perform operations on breeds collection.
 */
export class BreedsRepository implements Repository<Breed> {
    collection: Collection<Breed>;

    constructor(app: FirebaseApp) {
        this.collection = app.firestore().collection(Collections.Breeds) as Collection<Breed>;
    }

    /**
     * Get all entries from breeds collection.
     */
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
    }

    /**
     * Get an entry by id from breeds collection.
     * @param id
     */
    async get(id: string) {
        const snapshot = await this.collection.doc(id).get();
        return {
            name: snapshot.data()!.name,
            id: snapshot.id,
        };
    }

    /**
     * Add a new breed to collection
     * @param breed
     */
    async create(breed: Breed) {
        const document = await this.collection.add(breed);
        const snapshot = await document.get();
        return {
            name: snapshot.data()!.name,
            id: snapshot.id,
        };
    }

    /**
     * Updates a breed on the collection
     * @param breed
     */
    async update(item: Breed) {
        await this.collection.doc(item.id).set(item);
        return item;
    }

    /**
     * Deletes a breed by id.
     * @param id
     */
    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
