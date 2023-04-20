import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn,ManyToMany,JoinTable} from "typeorm"
import { Route } from "../entity/route.entity"
import { User } from "../entity/user.entity"
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

    /* @Column({ type: "datetime", nullable: false })
    fecha_hora: string */

    @OneToOne(()=>Route)
    @JoinColumn()
    route:Route

    @ManyToMany(() => User)
    @JoinTable()
    user_id: User[]

}