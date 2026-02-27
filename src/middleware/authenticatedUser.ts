import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "config";
import { Response, NextFunction } from "express";
import { IDecodedTokenReq } from "../types/express.js";

const authenticatedUser = () => {
  return (req: IDecodedTokenReq, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Not Authenticated user!");
    }
    try {
      const decoded = jwt.verify(token, config.get("privateKey"));
      req.user = decoded;

      next();
    } catch (err) {
      if (err instanceof Error)
        return res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
  };
};

export default authenticatedUser;
