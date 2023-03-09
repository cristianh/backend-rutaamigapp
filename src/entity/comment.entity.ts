import { Entity, Column, PrimaryGeneratedColumn,ManyToOne} from "typeorm"

//Import needed entyties
import { Forum } from "./forum.entity"
import { User} from "./user.entity"

/*idComentarios INT PRIMARY KEY auto_increment,
fecha DATE not null,
hora TIME not null,
comentario VARCHAR (45) not null,
usuario_idusuario int*/

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    comment_id: number

    @Column({ type: "date", nullable: false })
    date_comment: string

    @Column({ type: "time", nullable: false })
    time_comment: string

    @Column({ type: "varchar", nullable: false })
    content_comment: string
    
    /* @OneToMany(() => Foro, (foro) => foro.comentario)
    foro:Foro */

    @ManyToOne(() => User, (user) => user.comment)
    user:User[]
}