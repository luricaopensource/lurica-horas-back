export class CreateMilestoneDto {
    readonly date: Date
    readonly name: string
    readonly totalAmount: number
    readonly paidAmount: number
    readonly surplusAmount: number
    readonly projectId: number
}
