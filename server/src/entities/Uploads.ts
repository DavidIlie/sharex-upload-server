import { getFileStatsTypes } from "../lib/filesystem";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Uploads extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    uploaderId: ObjectID | string;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    stats: getFileStatsTypes;
}
