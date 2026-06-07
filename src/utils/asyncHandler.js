/**
Without this, every controller needs try/catch.

Instead:
const users = await User.find();

Any error automatically goes to global error handler.
 */

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
