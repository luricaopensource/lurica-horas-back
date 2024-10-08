import { Milestone } from "src/milestone/entities/milestone.entity"
import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public hours: number

    @Column({ type: "text" })
    public description: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public date: Date

    @Column({ nullable: true, default: null })
    public type: string

    @Column()
    public paid: boolean

    @Column()
    public status: string

    @ManyToOne(() => User, user => user.tasks, { eager: true })
    public user: User

    @ManyToOne(() => Project, project => project.tasks)
    public project: Project

    @ManyToOne(() => Milestone, milestone => milestone.tasks, { eager: true })
    public milestone: Milestone

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
