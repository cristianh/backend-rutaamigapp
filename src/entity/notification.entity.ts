import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Route } from "./route.entity"
import { User } from "./user.entity"

/*idNotificaciones INT primary key auto_increment,
intervalo INT  not null,
fecha_hora DATETIME not null,
ruta_idruta int*/

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id_notification: number

    @Column({ type: "int", nullable: false })
    notification_inverval: number

    /* @Column({ type: "datetime", nullable: false })
    fecha_hora: string */

    //Relations
    //With route many to one
    @ManyToOne(() => Route, (route) => route.route_id, {
    })
    @JoinColumn()
    route: Route;

    //With user many to one
    @ManyToOne(() => User, user => user.notification)
    user: User;
}