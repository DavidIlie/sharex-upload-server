import type { RequestHandler } from "express";

const NotFound: RequestHandler = (_req, res, _next) =>
    res.redirect(process.env.FRONTEND_URL as any);

export default NotFound;
