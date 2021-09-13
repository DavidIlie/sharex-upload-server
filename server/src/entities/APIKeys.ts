import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Settings extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @ObjectIdColumn()
    cretor: ObjectID;

    @Column()
    name: string;

    @Column()
    token: string;

    @Column()
    permissions: Array<string>;
}
