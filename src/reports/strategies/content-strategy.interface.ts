import { IReportContent, IReportHeaders } from "../tasks.report"

export interface ContentStrategy {
    generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][], headers: IReportHeaders[] }>
}
