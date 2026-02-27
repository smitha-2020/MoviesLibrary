import { Response, NextFunction } from "express";
import { IDecodedTokenReq } from "../types/express.js";

const isAdmin = () => {
  return (req: IDecodedTokenReq, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin) {
      return res.send("Is not an Admin");
    }
    next();
  };
};

export default isAdmin;
