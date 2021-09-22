import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class APIKeys extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    creator: ObjectID | string;

    @Column()
    name: string;

    @Column()
    token: string;

    @Column()
    lastUsed: Date;

    @Column()
    permissions: Array<string | undefined>;
}
