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


export const getHoursReport = (): TDocumentDefinitions => {
    return {
        styles,
        pageOrientation: 'landscape',
        header: headerSection({ title: 'Reporte de horas', showDate: true, showLogo: true }),
        pageMargins: [50, 120, 40, 60],
        content: [
            {
                layout: 'lightHorizontalLines',
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*', '*'],
                    body: [
                        ['Fecha', 'Proyecto', 'Tarea', 'Horas', 'Descripción'],
                        ['2021-01-01', 'Project 1', 'Task 1', '1', 'Description 1'],
                        ['2021-01-01', 'Project 1', 'Task 2', '2', 'Description 2'],
                        ['2021-01-01', 'Project 2', 'Task 1', '3', 'Description 3'],
                        ['2021-01-01', 'Project 2', 'Task 2', '4', 'Description 4'],
                        ['2021-01-02', 'Project 1', 'Task 1', '1', 'Description 5'],
                        ['2021-01-02', 'Project 1', 'Task 2', '2', 'Description 6'],
                        ['2021-01-02', 'Project 2', 'Task 1', '3', 'Description 7'],
                        ['2021-01-02', 'Project 2', 'Task 2', '4', 'Description 8']
                    ]
                }
            }
        ]
    }
}