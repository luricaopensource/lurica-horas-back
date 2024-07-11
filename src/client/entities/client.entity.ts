import { Company } from "src/companies/entities/company.entity"
import { Project } from "src/projects/entities/project.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany(() => Project, project => project.client)
    public projects: Project[]

    @ManyToOne(() => Company, company => company.clients)
    public company: Company

    @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
