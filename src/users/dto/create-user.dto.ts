export class CreateUserDto {
    readonly firstName: string
    readonly lastName: string
    readonly username: string
    readonly password: string
    readonly email: string
    readonly role: string | null
}
