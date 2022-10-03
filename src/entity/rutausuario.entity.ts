import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

/* idrutausuario       INT PRIMARY KEY auto_increment,
     estado              BOOLEAN DEFAULT 0,
     latitud             INT NOT NULL,
     longitud            INT NOT NULL,
     idruta_fk           INT,
     fecha_creacion      DATETIME DEFAULT Now(),
     fecha_actualizacion DATETIME,
     fecha_eliminacion   DATETIME */


@Entity()
export class RutaUsuario {
    @PrimaryGeneratedColumn()
    idrutausuario: number

    @Column({ type: "double", nullable: false })
    latitud: number

    @Column({ type: "double", nullable: false })
    longitud: number

    @Column({ type: "boolean", nullable: false })
    estado: boolean

    @CreateDateColumn()
    fecha_creacion: string

    @UpdateDateColumn()
    fecha_actualizacion: string

    @DeleteDateColumn()
    fecha_eliminacion: string
}