import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class DollarQuote {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public official: number

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    public blue: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    public updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    public deletedAt: Date
}
