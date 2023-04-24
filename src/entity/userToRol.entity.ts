import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, UpdateDateColumn, DeleteDateColumn } from "typeorm"
//Import needed entyties
import { File } from "./file.entity"
import { Rol } from "./rol.entity"
import { User } from "./user.entity"
import { Notification } from "./notification.entity"

@Entity()
export class UserToRol {

    @PrimaryGeneratedColumn()
    user_to_rol_id: number

    //With rol one to one
    //Manty to one
    //User

    @ManyToOne(() => User, (user) => user.user_rol) // specify inverse side as a second parameter
    user: User

    //Manty to one
    //Rol
    @ManyToOne(() => Rol, (rol) => rol.rol_user) // specify inverse side as a second parameter
    rol: Rol

}