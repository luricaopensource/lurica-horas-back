import path from "path"
import { Content, ContentImage } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers"

const basePath = path.resolve(__dirname, '../../../../')

const filePath = path.join(basePath, 'src/assets')

interface HeaderSection {
    title?: string
    subtitle?: string
    showDate?: boolean
    showLogo?: boolean

}

const currentDate: Content = {
    text: DateFormatter.getDDMMYYYY(new Date()),
    alignment: 'right',
    width: 150,
    margin: [40, 20]
}

const logo: ContentImage = {
    image: `${filePath}/lurica-logo.png`,
    width: 80,
    height: 80,
    alignment: 'left',
    margin: [50, 20, 0, 20]
}

export const headerSection = (options: HeaderSection): Content => {
    const { title, subtitle, showDate, showLogo } = options

    const headerSubtitle: Content = subtitle ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
            fontSize: 16,
            bold: true
        }
    } : null

    const headerTitle: Content =
        title ? {
            stack: [{ text: title, alignment: 'center', style: { bold: true, fontSize: 22 }, margin: [0, 15] }, headerSubtitle]
        }
            : null
    const headerDate: Content = showDate ? currentDate : null
    const headerLogo: ContentImage = showLogo ? logo : null

    return {
        columns: [
            headerLogo,
            headerTitle,
            headerDate
        ]
    }
}