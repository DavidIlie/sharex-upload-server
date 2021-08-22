require("dotenv").config();
import cors from "cors";
import express from "express";
import morgan from "morgan";

import * as middlewares from "./middleware";
import api from "./routes";

const main = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(morgan("dev"));

    const port = process.env.PORT || 4001;
    app.listen(port, () => {
        console.log(`app running on http://localhost:${port}`);
    });

    app.use("/api", api);

    app.use(middlewares.ErrorHandler);
    app.use(middlewares.NotFound);
};

main();
