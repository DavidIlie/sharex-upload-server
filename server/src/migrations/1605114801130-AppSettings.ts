import { Settings } from "../entity/Settings";
import { getConnectionOptions, MigrationInterface, QueryRunner } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class AppSettings1605114801130 implements MigrationInterface {
    name = "AppSettings1605114801130";

    public async up(): Promise<void> {
        await Settings.create({
            name: "ShareX Media Server",
            domains: [],
        }).save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        let settings = await Settings.find();

        const mongoRunner = queryRunner as MongoQueryRunner;
        const database = (await getConnectionOptions()).database as string;
        await mongoRunner.databaseConnection
            .db(database)
            .collection("settings")
            .deleteMany(settings);
    }
}
