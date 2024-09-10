import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UsersToProjects {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => User, user => user.usersToProjects)
    public user: User

    @ManyToOne(() => Project, project => project.usersToProjects, { eager: true })
    public project: Project

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 1 })
    public userHourlyAmount: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}