import { Task } from "src/tasks/entities/task.entity"
import { UsersToProjects } from "src/users_to_projects/users_to_projects.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UsersToCompanies } from '../../users_to_companies/users_to_companies.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @Column()
    public username: string

    @Column()
    public password: string

    @Column()
    public email: string

    @Column({ default: 1 })
    public role: number

    @Column({ default: 1 })
    public currency: number

    @Column({ nullable: true, type: 'decimal', precision: 15, scale: 2 })
    public hourlyAmount: number

    @Column({ nullable: true, type: 'decimal', precision: 15, scale: 2 })
    public monthlyAmount: number

    @Column({nullable: false, default: 1})
    public amountType: number

    @OneToMany(() => Task, task => task.user, { lazy: true })
    public tasks: Promise<Task[]>

    @OneToMany(() => UsersToProjects, usersToProjects => usersToProjects.user)
    public usersToProjects: UsersToProjects[]

    @OneToMany(() => UsersToCompanies, usersToCompanies => usersToCompanies.user)
    public usersToCompanies: UsersToCompanies[]

    @Column({ nullable: true, type: 'timestamp', default: null })
    public lastLogin: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
