import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
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

export const verifiedVisitor = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.visitor = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Encounter Error while in Verification",
      error,
    });
  }
};
