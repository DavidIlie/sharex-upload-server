import { hashPassword } from "./../lib/hashPassword";
import { Users } from "../entity/Users";
import { getConnectionOptions, MigrationInterface, QueryRunner } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class DefaultUser1605114801130 implements MigrationInterface {
    name = "DefaultUser1605114801130";

    public async up(): Promise<void> {
        const password = await hashPassword("password");

        await Users.create({
            name: "Default Account",
            email: "sharex@example.com",
            password: password,
            isAdmin: true,
        }).save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        let user = await Users.findOne({ email: "sharex@example.com" });

        if (user) {
            const mongoRunner = queryRunner as MongoQueryRunner;
            const database = (await getConnectionOptions()).database as string;
            await mongoRunner.databaseConnection
                .db(database)
                .collection("users")
                .deleteMany(user);
        } else {
            console.log("user not found, not deleting");
        }
    }
}
