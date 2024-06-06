export class CreateUserDto {
    readonly firstName: string
    readonly lastName: string
    readonly username: string
    readonly password: string
    readonly email: string
    readonly role: number | null
    readonly currency: number | null
    readonly hourlyAmount: number | null
    readonly monthlyAmount: number | null
}