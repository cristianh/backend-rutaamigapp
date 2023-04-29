import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn,UpdateDateColumn,DeleteDateColumn  } from "typeorm"
import { Route } from "./route.entity"
import { User } from "./user.entity"



@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id_notification: number

    @Column({ type: "int", nullable: false })
    notification_inverval: number

    @Column({ type: "varchar", length: 60, nullable: false })
    notification_message: string 

    @CreateDateColumn()
    notification_create_date: string

    /* @Column({ type: "datetime", nullable: false })
    fecha_hora: string */

    //Relations
    //With route many to one
    @ManyToOne(() => Route, (route) => route.route_id, {
    })
    @JoinColumn()
    route_notification: Route;

    //With user many to one
    @ManyToOne(() => User, user => user.notification)
    user_notification: User;
}