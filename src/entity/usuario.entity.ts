import { Entity, Column, PrimaryGeneratedColumn, OneToMany,CreateDateColumn,UpdateDateColumn,DeleteDateColumn} from "typeorm"
import { Comentario } from "../entity/comentario.entity"
import { Foro } from "../entity/foro.entity"
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
export class Usuario {
    @PrimaryGeneratedColumn()
    idusuario: number

    @Column({type: "varchar",length: 45,nullable:false})
    nombre_usuario: string

    @Column({type: "varchar",length: 45,nullable:false})
    apellido_usuario: string

    @Column({type: "varchar",length: 45,nullable:false})
    correo_usuario: string

    @Column({type: "varchar",length: 45,nullable:false})
    password_usuario: string

    @Column({type: "boolean",nullable:false})
    estado_usuario: string

    @OneToMany(() => Foro, (foro) => foro.comentario)
    foro:Foro

    @OneToMany(() => Comentario, (comentario) => comentario.usuario)
    comentario:Comentario

    @CreateDateColumn()
    fecha_creacion : string

    @UpdateDateColumn()
    fecha_actualizacion : string

    @DeleteDateColumn()
    fecha_eliminacion : string
}