import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.section"
import { Logger } from "@nestjs/common"
import { footerSection } from "./sections/footer.section"

export interface IReportHeaders {
    date: string
    task: string
    hours: string
    milestone: string
    project?: string
    employee?: string
    customer?: string
}

export interface IReportContent {
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


export const getHoursReport = (subtitle: string, content: IReportContent[][], headers: string[], totalContentRow: string[]): TDocumentDefinitions => {
    let widths = []
    headers.forEach((header: string) => {
        // header == "Tarea" ? widths.push('*') : widths.push('auto')

        if (header == "Tarea") { widths.push('*') }
        else if (header == "Horas") { widths.push(55) }
        else { widths.push('auto') }
    })

    const tableBody = [headers, ...content, totalContentRow]

    return {
        styles,
        pageOrientation: 'landscape',
        header: headerSection({ title: 'Reporte de horas', showDate: true, showLogo: true, subtitle }),
        footer: footerSection,
        pageMargins: [50, 120, 40, 60],
        content: [
            {
                layout: 'lightHorizontalLines',
                table: {
                    headerRows: 1,
                    widths: widths,
                    heights: 10,
                    dontBreakRows: true,
                    body: tableBody,
                }
            }
        ]
    }
}