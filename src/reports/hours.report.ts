import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.section"

interface IReportContent {
    date: string
    project: string
    task: string
    hours: number
    milestone: string
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


export const getHoursReport = (subtitle: string, content: IReportContent[]): TDocumentDefinitions => {
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
                    widths: ['*', '*', '*', '*', '*'],
                    body: [
                        ['Fecha', 'Proyecto', 'Tarea', 'Horas', 'Hito'],
                        ['2021-01-01', 'Project 1', 'Task 1', 1, 'Hito 1'],
                        content
                    ]
                }
            }
        ]
    }
}