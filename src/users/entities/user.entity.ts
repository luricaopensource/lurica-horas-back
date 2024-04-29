import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({ default: () => "'employee'" })
    role: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP', type: 'timestamp', default: null })
    updatedAt: Date

    @Column({ nullable: true, type: 'timestamp', default: null })
    deletedAt: Date
}

