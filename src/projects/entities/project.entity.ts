import { Company } from "src/company/entities/company.entity"
import { Milestone } from "src/milestone/entities/milestone.entity"
import { Task } from "src/tasks/entities/task.entity"
import { User } from "src/users/entities/user.entity"
import { UsersToProjects } from "src/users_to_projects/users_to_projects.entity"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    public id: number

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

    @OneToMany(() => UsersToProjects, usersToProjects => usersToProjects.project)
    public usersToProjects: UsersToProjects[]

    @OneToMany(() => Task, task => task.project)
    public tasks: Task[]

    @OneToMany(() => Milestone, milestone => milestone.project)
    public milestones: Milestone[]

    @ManyToOne(() => Company, company => company.projects)
    public company: Company

}
