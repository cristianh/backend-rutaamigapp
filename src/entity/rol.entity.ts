import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { User } from "../entity/user.entity"
import { UserToRol } from "./userToRol.entity"
@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol: number

    @Column({ type: "varchar", nullable: false })
    nombre_rol: string

    //Relations
    //With notification one to one
    @OneToMany(() => UserToRol, (usertorol) => usertorol.user) // specify inverse side as a second parameter
    rol_user: UserToRol[]
}