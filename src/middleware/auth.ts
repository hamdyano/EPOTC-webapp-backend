import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// Middleware to check JWT
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Middleware to parse JWT and attach user information to request
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as JwtPayload;
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401); // Unauthorized
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

   

    next();
  } catch (error) {
    return res.sendStatus(401); // Unauthorized
  }
};