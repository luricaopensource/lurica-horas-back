import { Client } from "src/client/entities/client.entity"
import { Milestone } from "src/milestone/entities/milestone.entity"
import { Task } from "src/tasks/entities/task.entity"
import { UsersToProjects } from "src/users_to_projects/users_to_projects.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column()
    public currency: number

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public amount: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date

    @OneToMany(() => UsersToProjects, usersToProjects => usersToProjects.project)
    public usersToProjects: UsersToProjects[]

    @OneToMany(() => Task, task => task.project, { eager: true })
    public tasks: Task[]

    @OneToMany(() => Milestone, milestone => milestone.project, { eager: true })
    public milestones: Milestone[]

    @ManyToOne(() => Client, client => client.projects, { eager: true })
    public client: Client
}
