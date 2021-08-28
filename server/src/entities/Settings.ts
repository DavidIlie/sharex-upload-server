import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { MediaSettingsType } from "@sharex-server/common";

@Entity()
export class Settings extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column("string", { default: "dark" })
    default_theme: "dark" | "light";

    @Column("array", { default: [] })
    domains: Array<string>;

    @Column()
    media_settings: MediaSettingsType;
}
