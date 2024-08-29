import { IReportContent, IReportHeaders } from "../tasks.report"

export abstract class ContentStrategy {
    getDateRange(dateFrom: string, dateTo: string): Date[] {
        const dateRange = []

        if (!dateFrom && !dateTo) {
            const fromDate = new Date()
            const toDate = new Date()
            toDate.setDate(toDate.getDate() - 30)

            dateRange.push(fromDate)
            dateRange.push(toDate)
            return dateRange
        }

        const from = new Date(dateFrom)
        const to = new Date(dateTo)

        if (dateFrom && dateTo) {
            to.setDate(to.getDate() + 1)

            dateRange.push(from)
            dateRange.push(to)

            return dateRange
        }

        if (dateFrom) {
            const thirtyMoreDays = new Date(dateFrom)

            thirtyMoreDays.setDate(thirtyMoreDays.getDate() + 30)
            dateRange.push(from)
            dateRange.push(thirtyMoreDays)
            return dateRange
        }

        const thirtyLessDays = new Date(dateTo)
        thirtyLessDays.setDate(thirtyLessDays.getDate() - 30)

        dateRange.push(thirtyLessDays)
        dateRange.push(to)

        return dateRange
    }

    abstract generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: IReportContent[][], headers: IReportHeaders[] }>
}
