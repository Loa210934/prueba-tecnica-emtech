import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  httpCode?: number;
}

const ErrorHandler = async (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line
): Promise<Response> => {
  const status = err.httpCode ?? 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ msg: message });
};

export default ErrorHandler;
