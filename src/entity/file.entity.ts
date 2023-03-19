import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn,DeleteDateColumn, OneToOne, JoinColumn} from "typeorm"
import { User } from "./user.entity";


/* CREATE TABLE files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255),
    cloudinary_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ); */

  @Entity()
export class File {
    @PrimaryGeneratedColumn()
    file_id: number

    @Column({type: String,length: 100,nullable:false})
    file_name: string

    @Column({type: String,length: 100,nullable:false})
    cloudinary_url: string

    @OneToOne(()=>User,(user)=>user.user_file)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    create_date : string

    @UpdateDateColumn()
    update_date : string

    @DeleteDateColumn()
    removal_date : string
}