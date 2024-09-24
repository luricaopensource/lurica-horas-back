import { IReportContent, IReportHeaders } from "../tasks.report"

export abstract class ContentStrategy {
    getDateRange(dateFrom: string, dateTo: string): { from: Date, to: Date } {
        const dateRange = {
            from: new Date(),
            to: new Date()
        }

        if (!dateFrom && !dateTo) {
            const toDate = new Date()
            const fromDate = new Date()
            fromDate.setDate(toDate.getDate() - 30)

            dateRange.from = fromDate
            dateRange.to = toDate
            return dateRange
        }

        const from = new Date(dateFrom)
        const to = new Date(dateTo)

        if (dateFrom && dateTo) {
            to.setDate(to.getDate() + 1)

            dateRange.from = from
            dateRange.to = to

            return dateRange
        }

        if (dateFrom) {
            const thirtyMoreDays = new Date(dateFrom)

            thirtyMoreDays.setDate(thirtyMoreDays.getDate() + 30)
            dateRange.from = from
            dateRange.to = thirtyMoreDays
            return dateRange
        }

        const thirtyLessDays = new Date(dateTo)
        thirtyLessDays.setDate(thirtyLessDays.getDate() - 30)
        to.setDate(to.getDate() + 1)

        dateRange.from = thirtyLessDays
        dateRange.to = to

        return dateRange
    }

    abstract generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][], totalContentRow: string[], headers: string[] }>
}
