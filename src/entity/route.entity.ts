import { Entity, Column, PrimaryGeneratedColumn,  OneToOne,JoinColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn} from "typeorm"
import { Notification } from "./notification.entity"

/*idRutas INT PRIMARY KEY auto_increment,
numero INT not null,
descripcion VARCHAR(45),
sentido VARCHAR(45) not null*/

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    route_id: number

    @Column({ type: "varchar", nullable: false })
    route_name: string

    @Column({ type: "varchar", nullable: false })
    route_content: string

    @Column({ type: "varchar", nullable: false })
    route_orientation: string

    @CreateDateColumn()
    route_create_date: string

    @UpdateDateColumn()
    route_update_date: string

    @DeleteDateColumn()
    route_removal_date: string

    //Relations
    //With notification one to one
    @OneToOne(() => Notification, notificacion => notificacion.route, {
    })
    @JoinColumn()
    notification: Notification;
}