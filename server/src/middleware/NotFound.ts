import type { RequestHandler } from "express";

const NotFound: RequestHandler = (req, res, _next) => {
    res.status(404);
    res.json({ message: `Not Found - ${req.originalUrl}` });
};

export default NotFound;
