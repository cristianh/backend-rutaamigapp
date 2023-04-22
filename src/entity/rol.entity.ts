import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from "../entity/user.entity"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol: number

    @Column({ type: "varchar", nullable: false })
    nombre_rol: string

    //Relations
    //With user one to one
    @OneToOne(() => User, (user) => user.user_rol, {
    })
    @JoinColumn()
    rol_user: User;
}