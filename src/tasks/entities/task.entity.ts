import { Project } from "src/projects/entities/project.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public dateFrom: Date

    @Column()
    public dateTo: Date

    @Column()
    public hours: number

    @Column({ type: "text" })
    public description: string

    @Column()
    public type: string

    @Column()
    public paid: boolean

    @Column()
    public status: string

    @ManyToOne(() => User, user => user.tasks)
    public user: User

    @ManyToOne(() => Project, project => project.tasks)
    public project: Project

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
