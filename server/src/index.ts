require("dotenv").config();
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import fs from "fs";

import { uploadDir } from "./lib/filesystem";
import { Uploads } from "./entities/Uploads";

import * as middlewares from "./middleware";
import api from "./routes";

const main = async () => {
    const conn = await createConnection();
    console.log(chalk`{bold.yellow running migrations}`);
    await conn.runMigrations();
    console.log(chalk`{bold.green migrations finished!}`);

    if (!fs.existsSync(uploadDir)) {
        console.log(chalk`{bold.cyan created uploads folder}`);
        fs.mkdirSync(uploadDir);

        const uploads = await Uploads.find();
        if (uploads) {
            await Uploads.remove(uploads);
            console.log(
                chalk`{bold.blue removed all uploads in DB (upload folder empty)}`
            );
        }
    }

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    app.use(cookieParser());

    app.use(morgan("dev"));

    const port = process.env.PORT || 4001;
    app.listen(port, () => {
        console.log(`app running on http://localhost:${port}`);
    });

    app.use("/", api);

    app.use(middlewares.ErrorHandler);
    app.use(middlewares.NotFound);
};

main();
