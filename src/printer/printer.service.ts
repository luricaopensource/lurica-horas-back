import { Injectable, Logger } from '@nestjs/common'
import path from 'path'
import PdfPrinter from 'pdfmake'
import { BufferOptions, TDocumentDefinitions } from "pdfmake/interfaces"

const basePath = path.resolve(__dirname, '../../../')

const filePath = path.join(basePath, 'fonts/')

const fonts = {
    Roboto: {
        normal: `${filePath}Roboto-Regular.ttf`,
        bold: `${filePath}Roboto-Medium.ttf`,
        italics: `${filePath}Roboto-Italic.ttf`,
        bolditalics: `${filePath}Roboto-MediumItalic.ttf`,
    }
}

@Injectable()
export class PrinterService {
    private printer = new PdfPrinter(fonts)

    createPdf(docDefinition: TDocumentDefinitions, options: BufferOptions = {}): PDFKit.PDFDocument {
        return this.printer.createPdfKitDocument(docDefinition, options)
    }
}
