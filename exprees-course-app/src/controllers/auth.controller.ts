import { Request, Response, NextFunction } from 'express';
import { IUser, User } from '../models/user';
import { statuses } from '../constants/statuses';
import { IRegisterUserPayloadType } from 'src/interfaces/User/RegisterType';

export default {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body as IRegisterUserPayloadType;
      const duplicatedUser = await User.findOne({ email: data.email });
      if (duplicatedUser) {
        res.status(statuses.DUPLICATED).json({ msg: 'Correo ya existente' });
        return;
      }
      const newUser = await User.create(data);
      newUser.signin();
      newUser.password = undefined;
      const userObject = newUser.toObject();
      const authUser = {
        _id: userObject._id.toString(),
        name: userObject.name,
        lastName: userObject.lastName,
        email: userObject.email,
        token: userObject.token,
      };

      res.status(statuses.CREATED).json(authUser);
    } catch (error) {
      next(error);
    }
  },
  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData = req.body;
      const escapeRegExp = (text: string) =>
        text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regexEmail = escapeRegExp(loginData.email);

      const user: IUser | null = await User.findOne(
        {
          email: { $regex: regexEmail, $options: 'i' },
          status: true,
        },
        {
          email: 1,
          password: 1,
          role: 1,
          userType: 'administrador',
          name: 1,
          lastName: 1,
        }
      );

      if (!user || !user.validPassword(loginData.password)) {
        res
          .status(statuses.NOTFOUND)
          .json({ msg: 'Sus credenciales son incorrectas' });
        return;
      }
      user.signin();
      user.password = undefined;
      res.status(statuses.OK).json({ user });
    } catch (error) {
      next(error);
    }
  },
  async courseData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findById({ _id: req.user._id });
      if (!user) {
        res.status(statuses.NOTFOUND).json(req.user);
        return;
      }
      user.signin();
      res.status(statuses.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findById(
        { _id: req.user._id },
        { _id: 1, name: 1, email: 1 }
      );
      if (!user) {
        res.status(statuses.NOTFOUND).json(req.user);
        return;
      }
      user.signin();
      res.status(statuses.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  async setPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = req.user;
      const newPasswordData = req.body;
      // const validate = validator.getSchema('newPasswordSchema');
      // if (!validate || !validate(newPasswordData)) {
      //   return res.status(statuses.NOTFOUND).json(validate?.errors);
      // }
      const user = await User.findById(userData._id, {
        password: 1,
        status: 1,
      });
      if (!user) {
        res.status(statuses.NOTFOUND).json({ msg: 'Usuario no encontrado.' });
        return;
      }
      if (newPasswordData.currentPassword) {
        if (!user.validPassword(req.body.currentPassword)) {
          res.status(statuses.NOTFOUND).json({ msg: 'Wrong data' });
          return;
        }
      }
      user.password = newPasswordData.newPassword;
      user.status = true;
      await user.save();
      res.status(statuses.OK).json({ msg: 'Contraseña guardada' });
    } catch (error) {
      next(error);
    }
  },

  async recoverPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findOne({
        email: req.body.email,
        status: true,
      });
      if (user) {
        res.status(statuses.OK).json({ msg: 'Solicitud exitosa.' });
      } else {
        res
          .status(statuses.BADEMAIL)
          .json({ msg: 'Correo electrónico no registrado.' });
      }
    } catch (error) {
      next(error);
    }
  },
};
