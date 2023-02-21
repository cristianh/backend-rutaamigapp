
import { Entity, Column, PrimaryGeneratedColumn,  OneToOne,JoinColumn} from "typeorm"
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
    orientation_route: string
}