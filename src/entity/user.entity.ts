import { Entity, Column, PrimaryGeneratedColumn, OneToMany,CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from "typeorm"

//Import needed entyties
import { Comment } from "./comment.entity"
import { Forum } from "./forum.entity"
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

    @Column({type: String,length: 45,nullable:false})
    user_name: string

    @Column({type: String,length: 45,nullable:false})
    user_lastname: string

    @Column({type: String,length: 45,nullable:false})
    user_email: string

    @Column({type: "varchar",length: 60,nullable:false})
    user_password: string

    @Column({type: "boolean",nullable:false,default: true})
    user_status: string

    /* @OneToMany(() => Foro, (foro) => foro.comentario)
    foro:Foro */

    @OneToMany(() => Comment, (comment) => comment.user)
    comment:Comment

    @CreateDateColumn()
    create_date : string

    @UpdateDateColumn()
    update_date : string

    @DeleteDateColumn()
    removal_date : string
}