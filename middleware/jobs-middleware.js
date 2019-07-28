import { JobsModel } from "../models";

export const checkJobsByParams = async (req, res, next) => {
  try {
    const summary = await JobsModel.findOne({ _id: req.params.id });
    req.id = summary.id;
    return next();
  } catch (e) {
    res.send(404, { message: "Вакансия не найдена" });
  }
};
