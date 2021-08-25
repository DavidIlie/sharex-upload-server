import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column("text", { unique: true })
    email: string;

    @Column("string", { nullable: true })
    image_url: string;

    @Column("string", { default: "dark" })
    theme: "dark" | "light";

    @Column("boolean", { default: false })
    isAdmin: boolean = false;

    @Column("boolean", { default: false })
    confirmed: boolean = false;

    @Column()
    password: string;
}
