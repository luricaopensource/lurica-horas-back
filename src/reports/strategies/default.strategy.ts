import { ContentStrategy } from "./content-strategy.interface"

export class DefaultGenerationStrategy extends ContentStrategy {
    constructor() { super() }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: any[]; headers: any[] }> {
        return { content: [], headers: [] }
    }
}