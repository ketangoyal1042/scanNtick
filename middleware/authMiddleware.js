import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    console.log('====================================');
    console.log(req.headers.authorization);
    console.log('====================================');
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Encounter Error while in Authorization",
      error,
    });
  }
};
