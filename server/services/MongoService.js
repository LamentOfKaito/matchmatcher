import {MongoClient} from 'mongodb'

export const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017';

export default class MongoService {
    
    constructor({uri}) {
        this.client = new MongoClient(uri);
        this.db = this.client.db('matchmatcher');
    }
    
    async insert(coll, doc) {
        const result = await this.db.collection(coll).insertOne(doc);
        return result;
    }

    async existsAny(coll, query) {
        const aDoc = await this.db.collection(coll).findOne(query);
        return !!aDoc;
    }

    async existsById(coll, id) {
        const result = await this.getExistingIds(coll, [id]);
        return result.length > 0;
    }

    /**
     * Filter (in) existing ids
     *
     * @param {Array<number>} ids
     * @returns {Promise<Array<number>>} existing ids
     */
    async getExistingIds(coll, ids) {
        const result = await this.db.collection(coll)
            .find({ 'metadata.matchId': { $in: ids } },
                {projection: { _id: 0, 'metadata.matchId': 1 }
            })
            .toArray();
        const foundIds = result.map(obj => obj.metadata.matchId);
        return foundIds;
    }

}
