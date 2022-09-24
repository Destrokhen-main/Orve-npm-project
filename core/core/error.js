class error extends Error {
  constructor(message) {
    super(message);
    this.name = "sReact";
  }
}

const createError = ( message ) => {
  throw new error(message);
}

export default createError;