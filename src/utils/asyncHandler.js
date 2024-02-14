


const asyncHandler = (requestHandeler) => {
  
  return (req, res, next) => {
    // return is most important
    Promise.resolve(requestHandeler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
