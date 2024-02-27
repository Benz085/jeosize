
import * as jwt from 'jsonwebtoken';
import { config } from "../config";

export const generateJWT = (idToken: string ) => {
  const jwtSecret: string = config.JWT_SECRET ?? '';
  return jwt.sign({ token: idToken}, jwtSecret, { expiresIn: '1h' });
};
