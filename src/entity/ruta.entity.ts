
import { Entity, Column, PrimaryGeneratedColumn,  OneToOne,JoinColumn} from "typeorm"
/*idRutas INT PRIMARY KEY auto_increment,
numero INT not null,
descripcion VARCHAR(45),
sentido VARCHAR(45) not null*/

@Entity()
export class Ruta {
    @PrimaryGeneratedColumn()
    idRutas: number

    @Column({ type: "varchar", nullable: false })
    nombre: string

    @Column({ type: "varchar", nullable: false })
    descripcion: string

    @Column({ type: "varchar", nullable: false })
    sentido: string
}