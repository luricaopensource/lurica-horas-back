import { Client } from "src/client/entities/client.entity"
import { UsersToCompanies } from "src/users_to_companies/users_to_companies.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column()
    public address: string

    @Column()
    public location: string

    @OneToMany(() => Client, client => client.company, { eager: true, cascade: true })
    public clients: Client[]

    @OneToMany(() => UsersToCompanies, usersToCompanies => usersToCompanies.company)
    public usersToCompanies: UsersToCompanies[]

    @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
