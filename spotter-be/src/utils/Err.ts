interface Err {
  statusCode: number;
}

class Err extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default Err;