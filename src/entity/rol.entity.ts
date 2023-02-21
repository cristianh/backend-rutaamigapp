import { Entity, Column, PrimaryGeneratedColumn,  OneToOne,JoinColumn} from "typeorm"
import { User } from "../entity/user.entity"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    idrol: number

    @Column({ type: "varchar", nullable: false })
    nombre: string

    @Column({ type: "int", nullable: false })
    nivel: number

    @OneToOne(()=>User)
    @JoinColumn()
    user: User;
}