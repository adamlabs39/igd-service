import ReportService from "../services/report-service.js";

export default class ReportController {
    static async getTindakans(request, response, nextFunction) {
        try {
            request.query.faskes_uuid = response.locals.jwtData.faskesUuid;
            const result = await ReportService.getTindakans(request.query);
            response.status(200).json(result);
        } catch (error) {
            nextFunction(error);
        }
    }
}