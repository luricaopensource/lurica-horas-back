import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    @Column("text")
    description: string
}
