import { ContentStrategy } from "./content-strategy.interface"

export class ContentGenerator {
    private strategy: ContentStrategy

    constructor(strategy: ContentStrategy) {
        this.strategy = strategy
    }

    async generate(dateFrom: string, dateTo: string) {
        return await this.strategy.generateContentAndHeaders(dateFrom, dateTo)
    }
}
