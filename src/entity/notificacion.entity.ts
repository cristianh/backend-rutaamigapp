import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn} from "typeorm"
import { Route } from "../entity/route.entity"
/*idNotificaciones INT primary key auto_increment,
intervalo INT  not null,
fecha_hora DATETIME not null,
ruta_idruta int*/
@Entity()
export class Notificacion {
    @PrimaryGeneratedColumn()
    idNotificaciones: number

    @Column({ type: "int", nullable: false })
    intervalo: number

  /*   @Column({ type: "datetime", nullable: false })
    fecha_hora: string */

    @Column({ type: "timestamp", nullable: false })
    fecha_hora: string

    @OneToOne(()=>Route)
    @JoinColumn()
    route:Route

   
}