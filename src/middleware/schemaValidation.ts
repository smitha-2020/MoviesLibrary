import { StatusCodes } from "http-status-codes";
import { Request, NextFunction, Response } from "express";
import { ObjectSchema } from "joi";
import { IDecodedTokenReq } from "../types/express.js";

type RequestProperty = "body" | "params" | "query";

const validation = <T>(
  schema: ObjectSchema<T>,
  property: RequestProperty = "body",
) => {
  return (req: IDecodedTokenReq, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property as keyof Request], {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: false, // Don't wrap error labels
        },
      },
    });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).send(
        error.details.map((detail) => ({
          path: detail.path[0],
          message: detail.message,
        })),
      );
    }

    req[property] = value;
    next();
  };
};

export default validation;
