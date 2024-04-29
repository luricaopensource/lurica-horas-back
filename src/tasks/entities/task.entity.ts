import { User } from "src/users/entities/user.entity"
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dateFrom: Date

    @Column()
    dateTo: Date

    @Column()
    hours: number

    @Column({ type: "text" })
    description: string

    @Column()
    type: string

    @Column()
    paid: boolean

    @Column()
    status: string

    // User relation
    @ManyToOne(() => User, user => user.tasks)
    user: User

    // TODO: Project relation

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    deletedAt: Date
}
