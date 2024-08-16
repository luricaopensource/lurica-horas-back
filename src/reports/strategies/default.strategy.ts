import { ContentStrategy } from "./content-strategy.interface"

export class DefaultGenerationStrategy implements ContentStrategy {
    constructor() { }

    async generateContentAndHeaders(dateFrom: string, dateTo: string): Promise<{ content: any[]; headers: any[] }> {
        return { content: [], headers: [] }
    }
}