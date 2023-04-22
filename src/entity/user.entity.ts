import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinTable, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm"
//Import needed entyties
import { File } from "./file.entity"
import { Rol } from "./rol.entity"
import { Notification } from "./notification.entity"

/*idusuario           INT PRIMARY KEY auto_increment,
nombre_usuario      VARCHAR(45) NOT NULL,
apellido_usuario    VARCHAR(45) NOT NULL,
correo_usuario      VARCHAR(45) NOT NULL UNIQUE,
password_usuario    VARCHAR(45) NOT NULL,
estado_usuario      BOOLEAN DEFAULT 1,
fecha_creacion      DATETIME DEFAULT Now(),
fecha_actualizacion DATETIME,
fecha_eliminacion   DATETIME,
*/


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ type: String, length: 45, nullable: false })
    user_name: string

    @Column({ type: String, length: 45, nullable: false })
    user_lastname: string

    @Column({ type: String, length: 45, nullable: false })
    user_email: string

    @Column({ type: "varchar", length: 60, nullable: false })
    user_password: string

    @Column({ type: "boolean", nullable: false, default: true })
    user_status: boolean

    @CreateDateColumn()
    user_create_date: string

    @UpdateDateColumn()
    user_update_date: string

    @DeleteDateColumn()
    user_removal_date: string

    //Relations
    //With File one to one
    @OneToOne(() => File, (file) => file.user) // specify inverse side as a second parameter
    file: File

    //With rol one to one
    @OneToOne(() => Rol, (rol) => rol.rol_user) // specify inverse side as a second parameter
    user_rol: Rol

    //With notification many to many
    @OneToMany(() => Notification, notification => notification.user)
    notification: Notification[];
}