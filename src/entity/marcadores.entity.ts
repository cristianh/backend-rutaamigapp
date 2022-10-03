
import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"

/*idMarcadores Int primary key auto_increment,
longitud float not null,
latitud float not null,
estado tinyint,
tiempo_recorrido time*/




@Entity()
export class Marcador {
    @PrimaryGeneratedColumn()
    idMarcadores: number

    @Column({ type: "float", nullable: false })
    longitud: number

    @Column({ type: "float", nullable: false })
    latitud: number

    @Column({ type: "tinyint", nullable: false })
    estado: boolean

    @Column({ type: "time", nullable: false })
    tiempo_recorrido:string

   
}