import sequelizeInstance from "../configurations/sequelize-instance.js";
import Pagination from "../helpers/pagination.js";
import {Op} from "sequelize";
import moment from "moment";
import {HistoryTindakanModel, PetugasTindakanModel} from "@adameds/model-sdk/rekam-medis";

export default class ReportRepository {
    static async getTindakans(args) {
        return sequelizeInstance.transaction(async (tr) => {
            const currentYear = moment().year();
            const currentMonth = moment().month() + 1;
            const startOfMonth = moment().year(currentYear).month((args.month ?? currentMonth) - 1).startOf('month').valueOf();
            const endOfMonth = moment().year(currentYear).month((args.month ?? currentMonth) - 1).endOf('month').valueOf();

            let filter = {
                nama_tindakan: {[Op.like]: `%${args.name || ""}%`},
                created_at: {
                    [Op.between]: [startOfMonth, endOfMonth]
                },
                pelayanan : {[Op.like]: `%${args.pelayanan || ""}%`},
                faskes_uuid: args.faskes_uuid,
            };

            if (args.lokasi_uuid !== undefined && args.lokasi_uuid !== "" && args.lokasi_uuid !== null) {
                filter.lokasi_uuid = {[Op.like]: `%${args.lokasi_uuid || ""}%`}
            }

            const option = {
                where: {
                    ...filter
                },
                include: [
                    {
                        model: PetugasTindakanModel,
                        as: "petugas_tindakan",
                        attributes: ["practitionerUuid"],
                        required: false,
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