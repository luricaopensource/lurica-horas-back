import { Project } from "src/projects/entities/project.entity"
import { Task } from "src/tasks/entities/task.entity"
import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Milestone {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => Project, project => project.milestones)
    public project: Project

    @Column()
    public name: string

    @Column()
    public date: Date

    @Column({ type: "float" })
    public amountPercentage: number

    @OneToMany(() => Task, task => task.milestone)
    public tasks: Task[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
