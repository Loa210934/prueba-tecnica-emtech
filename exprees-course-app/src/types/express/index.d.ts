import { IUser } from 'src/models/user'; // ajusta la ruta si es necesario

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}