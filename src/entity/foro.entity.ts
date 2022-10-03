import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"

import { Usuario } from "../entity/usuario.entity"
import { Comentario } from "../entity/comentario.entity"

/*idForo int primary key auto_increment,
usuarios_idusuario int,
comentarios_idcomentarios int,
estado tinyint not null*/
//TODO: ojo aca, porque necesitamos  latitud y longitud, y tiempo recorrido. foro es una vista!!!
@Entity()
export class Foro {
    @PrimaryGeneratedColumn()
    idForo: number

    @Column({ type: "float", nullable: false })
    longitud: number

    @Column({ type: "float", nullable: false })
    latitud: number

    @Column({ type: "tinyint", nullable: false })
    estado: boolean

    @Column({ type: "time", nullable: false })
    tiempo_recorrido:string

  /*   @ManyToMany(() => Comentario)
    comentario: Comentario[]

    @ManyToMany(() => Usuario)
    usuario: Usuario[] */

    @ManyToOne(() => Usuario, (usuario) => usuario.foro)
    usuario!: Usuario

    @ManyToOne(() => Comentario, (comentario) => comentario.foro)
    comentario!: Comentario
}