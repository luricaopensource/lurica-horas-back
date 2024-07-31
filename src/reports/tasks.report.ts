import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.section"
import { Logger } from "@nestjs/common"

interface IReportHeaders {
    date: string
    task: string
    hours: string
    milestone: string
    project?: string
    employee?: string
    customer?: string
}

interface IReportContent {
    date: string
    task: string
    hours: number
    milestone: string
    project?: string
    employee?: string
    customer?: string
}

const styles: StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 0, 20]
    },
    body: {
        alignment: 'center',
        margin: [0, 120, 0, 0]
    }
}


export const getHoursReport = (subtitle: string, content: IReportContent[][], headers: IReportHeaders[]): TDocumentDefinitions => {
    let widths = []
    headers.forEach(() => { widths.push('*') })

    const tableBody = [headers, ...content]

    return {
        styles,
        pageOrientation: 'landscape',
        header: headerSection({ title: 'Reporte de horas', showDate: true, showLogo: true, subtitle }),
        pageMargins: [50, 120, 40, 60],
        content: [
            {
                layout: 'lightHorizontalLines',
                table: {
                    headerRows: 1,
                    widths: widths,
                    body: tableBody
                }
            }
        ]
    }
}