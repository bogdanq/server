import { TokenModel } from "../models";

export const privateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const session = await TokenModel.findOne({ token });
    req.userEmail = session.userEmail;
    req.token = token;
    return next();
  } catch (e) {
    res.send(404, { message: "Неправильный токен" });
  }
};
