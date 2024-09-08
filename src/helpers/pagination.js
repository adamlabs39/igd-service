import Utils from "./utils.js";

export default class Pagination{
    static async init(model, args, filter = {}, options= {}){
        const page = args.page || 1;
        const limit = args.limit || 10;
        const offset = (page - 1) * limit;

        const query = await model.findAndCountAll({
            limit: limit,
            offset: offset,
            where: filter,
            distinct:true,
            ...options
        });

        return {
            data: query.rows,
            pagination: Utils.paginationHelper(page, limit, query.count)
        }
    }
}