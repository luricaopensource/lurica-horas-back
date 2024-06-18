import { TDocumentDefinitions } from "pdfmake/interfaces"

interface ReportOptions {
    name: string
}

export const getSampleReport = (options: ReportOptions): TDocumentDefinitions => {
    const { name } = options

    return {
        content: [
            { text: `${name}`, style: 'header' },
            { text: 'This is a sample report', style: 'sub_header' }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            sub_header: {
                fontSize: 14,
                bold: true
            }
        }
    }
}