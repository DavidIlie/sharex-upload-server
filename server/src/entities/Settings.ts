import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Settings extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    domains: Array<string>;
}
