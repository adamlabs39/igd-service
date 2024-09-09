import sequelizeInstance from "../configurations/sequelize-instance.js";
import HistoryTindakanModel from "../models/history-tindakan-model.js";
import Pagination from "../helpers/pagination.js";
import {Op} from "sequelize";
import PetugasTindakanModel from "../models/petugas-tindakan-model.js";
import moment from "moment";

export default class ReportRepository {
    static async getTindakans(args) {
        return sequelizeInstance.transaction(async (tr) => {
            const currentYear = moment().year();
            const currentMonth = moment().month() + 1;
            const startOfMonth = moment().year(currentYear).month((args.month ?? currentMonth) - 1).startOf('month').valueOf();
            const endOfMonth = moment().year(currentYear).month((args.month ?? currentMonth) - 1).endOf('month').valueOf();

            const filter = {
                nama_tindakan: {[Op.like]: `%${args.name || ""}%`},
                created_at: {
                    [Op.between]: [startOfMonth, endOfMonth]
                },
                faskes_uuid: args.faskes_uuid,
            };

            const option = {
                where: {
                    ...filter
                },
                include: [
                    {
                        model: PetugasTindakanModel,
                        as: "petugas_tindakan",
                        attributes: ["practitionerUuid"],
                        required: true,
                        where: {
                            practitioner_uuid: {
                                [Op.iLike]: `%${args.practitioner_uuid || ""}%`
                            }
                        }
                    }
                ],
            }

            return await Pagination.init(HistoryTindakanModel, args, option);
        });

    }
}