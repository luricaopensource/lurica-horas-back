import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UsersToProjects {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => User, user => user.usersToProjects)
    public user: User

    @ManyToOne(() => Project, project => project.usersToProjects)
    public project: Project

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public userHourlyAmount: number
}