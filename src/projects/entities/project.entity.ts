import { Task } from "src/tasks/entities/task.entity"
import { User } from "src/users/entities/user.entity"
import { UsersToProjects } from "src/users_to_projects/users_to_projects.entity"
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    public id: number

    // TODO: Create Company entity
    // @OneToMany(Company, company.projects)
    // companies: Company[]

    @Column()
    public name: string

    @Column()
    public currency: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date

    // TODO: Milestone relation
    // @OneToMany(Milestone, milestone.project)
    // milestones: Milestone[]

    @OneToMany(() => UsersToProjects, usersToProjects => usersToProjects.project)
    public usersToProjects: UsersToProjects[]

    @OneToMany(() => Task, task => task.project)
    public tasks: Task[]
}
