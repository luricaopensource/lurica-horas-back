import { Project } from "src/projects/entities/project.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Milestone {
    @PrimaryGeneratedColumn()
    public id: number

    @ManyToOne(() => Project, project => project.milestones, { eager: true })
    public project: Project

    @Column()
    public name: string

    @Column()
    public date: Date

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public totalAmount: number

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public paidAmount: number

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public surplusAmount: number

    @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
