export class DateFormatter {
    static getDDMMYYYY(date: Date): string {
        const formatter = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })

        return formatter.format(date)
    }

    static getDDMMYYYYHHMM(date: Date): string {
        const formatter = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })

        return formatter.format(date)
    }
}