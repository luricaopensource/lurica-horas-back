import { IReportContent, IReportHeaders } from "../tasks.report"

export abstract class ContentStrategy {
    getDateRange(dateFrom: string, dateTo: string): Date[] {
        const dateRange = []
        if (dateFrom && dateTo) {
            const from = new Date(dateFrom)
            const to = new Date(dateTo)
            to.setDate(to.getDate() + 1)

            dateRange.push(from)
            dateRange.push(to)
        }
        return dateRange
    }

    abstract generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][], headers: IReportHeaders[] }>
}
