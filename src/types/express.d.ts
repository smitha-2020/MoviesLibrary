import { Request } from "express";
import User from "../model/user.ts";

export interface IDecodedTokenReq extends Request {
  user?: User;
}
