import { Company } from "src/companies/entities/company.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UsersToCompanies {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => User, user => user.usersToCompanies)
    public user: User

    @ManyToOne(() => Company, company => company.usersToCompanies)
    public company: Company

    @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}