import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from "typeorm"
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

  @Column({ type: String, length: 100, nullable: false })
  file_name: string

  @Column({ type: String, length: 100, nullable: false })
  cloudinary_url: string

  @CreateDateColumn()
  file_create_date: string

  @UpdateDateColumn()
  file_update_date: string

  @DeleteDateColumn()
  file_removal_date: string

  //Relations
  //With user one to one
  @OneToOne(() => User, (user) => user.user_file, {
    cascade: true
  })
  @JoinColumn()
  user: User;
}