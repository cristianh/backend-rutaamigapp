import { Entity, Column, PrimaryGeneratedColumn,  OneToOne,JoinColumn} from "typeorm"
import { Usuario } from "../entity/usuario.entity"

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    idrol: number

    @Column({ type: "varchar", nullable: false })
    nombre: string

    @Column({ type: "int", nullable: false })
    nivel: number

    @OneToOne(()=>Usuario)
    @JoinColumn()
    usuario: Usuario;
}