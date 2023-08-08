//Middleware වලට (req, res, next)  යන 3ම පවති
//if route we enter wrong route --> eg:- http://localhost:5000/asdffgggddd
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  //pass error to next middleware
  next(error);
};

const errorHandler = (err, req, res, next) => {
  //statusCode එක 200 තිබුනා  නම් 500 ට මාරු කරනවා
  //statusCode එක 200 නොතිබුනා නම් එහි අගය වෙනස් කරන්නෙ නැත

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
