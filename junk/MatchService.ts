export default class MatchService {

    db;
    riot;

    async existsById(id) {
        const result = await this.existingIds([id]);
        return result.length === 1;
    }

    /**
     * Filter (in) existing ids
     *
     * @param {Array<number>} ids
     * @returns {Array<number>} existing ids
     */
    async existingIds(ids) {
        let result = this.db.collection.find({ id: { $in: ids } }, { _id: false, id: true });
        // do we need to map?
        result = result.map(obj => obj.id);
        return result;
    }
    
    async refreshSummoner(region, name) {
        const allMatchIds = this.riot.getMatchIds(region, name);
        const existingMatchIds = await this.existingIds(allMatchIds);
        const missingMatchIds  = allMatchIds.filter(id => !existingMatchIds.includes(id));
        
        for (const id in missingMatchIds) {
            const match = await this.riot.getMatch(id);
            await this.db.collection.insert(match);
        }

        return true;
    
    }

}
