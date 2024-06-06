import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    public total_amount: number

    @Column()
    public paid_amount: number

    @Column()
    public surplus_amount: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}