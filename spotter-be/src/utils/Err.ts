class Err extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    // @ts-ignore
    this.statusCode = statusCode;
  }
}

export default Err;
