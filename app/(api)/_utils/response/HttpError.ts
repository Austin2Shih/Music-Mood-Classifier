export default class HttpError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}
