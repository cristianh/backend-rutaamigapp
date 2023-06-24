import { Entity, Column, PrimaryGeneratedColumn,OneToMany} from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol: number

    @Column({ type: "varchar", nullable: false })
    nombre_rol: string

    

    //With rol user many to many
    @OneToMany(() => User, user => user.rol_user,{ cascade: ['insert', 'update'] })
    user_rol: Rol[];
}