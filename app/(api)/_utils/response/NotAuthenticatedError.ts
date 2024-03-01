import HttpError from './HttpError';

export default class NotAuthenticatedError extends HttpError {
  constructor(message: string) {
    super(message);
    this.name = 'NotAuthenticatedError';
    this.status = 401;
  }
}
