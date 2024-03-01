import HttpError from './HttpError';

export default class NoContentError extends HttpError {
  constructor() {
    super('No Content Provided');
    this.name = 'NoContentError';
    this.status = 204;
  }
}
