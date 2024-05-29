import { Project } from "src/projects/entities/project.entity"
import { Task } from "src/tasks/entities/task.entity"
import { UsersToProjects } from "src/users_to_projects/users_to_projects.entity"
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

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

    @Column({ default: () => "'employee'" })
    public role: string

    @OneToMany(() => Task, task => task.user)
    public tasks: Task[]

    @OneToMany(() => UsersToProjects, usersToProjects => usersToProjects.user)
    public usersToProjects: UsersToProjects[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}

