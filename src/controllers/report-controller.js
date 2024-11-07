import ReportService from "../services/report-service.js";
import SuccessResponse from "../responses/success-response.js";

export default class ReportController {
    static async getTindakans(request, response, nextFunction) {
        try {
            request.query.faskes_uuid = request.author.faskesUuid;
            const result = await ReportService.getTindakans(request.query);
            response.status(200).json(SuccessResponse("data berhasil didapat", result.data, result.pagination));
        } catch (error) {
            nextFunction(error);
        }
    }
}