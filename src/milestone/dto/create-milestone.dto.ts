export class CreateMilestoneDto {
    readonly id?: number
    readonly date: Date
    readonly name: string
    readonly amountPercentage: number
    readonly projectId: number
}
