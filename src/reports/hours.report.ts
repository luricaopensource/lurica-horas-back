import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.section"

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


export const getHoursReport = (subtitle: string): TDocumentDefinitions => {
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
                        ['2021-01-01', 'Project 1', 'Task 1', '1', 'Hito 1'],
                        ['2021-01-01', 'Project 1', 'Task 2', '2', 'Hito 2'],
                        ['2021-01-01', 'Project 2', 'Task 1', '3', 'Hito 3'],
                        ['2021-01-01', 'Project 2', 'Task 2', '4', 'Hito 4'],
                        ['2021-01-02', 'Project 1', 'Task 1', '1', 'Hito 5'],
                        ['2021-01-02', 'Project 1', 'Task 2', '2', 'Hito 6'],
                        ['2021-01-02', 'Project 2', 'Task 1', '3', 'Hito 7'],
                        ['2021-01-02', 'Project 2', 'Task 2', '4', 'Hito 8']
                    ]
                }
            }
        ]
    }
}