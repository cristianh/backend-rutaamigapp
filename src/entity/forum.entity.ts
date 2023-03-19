import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"

import { User } from "./user.entity"
import { Comment } from "./comment.entity"

/*idForo int primary key auto_increment,
usuarios_idusuario int,
comentarios_idcomentarios int,
estado tinyint not null*/
@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    forum_id: number

   /*  @Column({ type: "float", nullable: false })
    longitud: number

    @Column({ type: "float", nullable: false })
    latitud: number */

   /*  @Column({ type: "tinyint", nullable: false })
    estado: boolean */

    @Column({ type: "smallint", nullable: false })
    estado: boolean

 /*    @Column({ type: "time", nullable: false })
    tiempo_recorrido:string */

  /*   @ManyToMany(() => Comentario)
    comentario: Comentario[]

    @ManyToMany(() => Usuario)
    usuario: Usuario[] */

   /*  @ManyToOne(() => Usuario, (usuario) => usuario.foro)
    usuario!: Usuario */

   /*  @ManyToOne(() => Comentario, (comentario) => comentario.foro)
    comentario!: Comentario */
}