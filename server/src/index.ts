require("dotenv").config();
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";

import * as middlewares from "./middleware";
import api from "./routes";

const main = async () => {
    await createConnection();

    const app = express();

    app.use(express.json());
    app.use(cors());

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
