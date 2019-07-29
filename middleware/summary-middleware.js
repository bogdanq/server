import { SummaryModel, JobsModel } from "../models";

export const checkSummary = async (req, res, next) => {
  try {
    const summary = await SummaryModel.findOne({ _id: req.body.id });
    req.id = summary.id;
    return next();
  } catch (e) {
    res.send(404, { message: "Резюме не найдено" });
  }
};

export const checkJobs = async (req, res, next) => {
  try {
    const summary = await JobsModel.findOne({ _id: req.body.id });
    req.id = summary.id;
    return next();
  } catch (e) {
    res.send(404, { message: "Вакансия не найдено" });
  }
};

export const checkSummaryComments = async (req, res, next) => {
  try {
    const summaryComments = await SummaryModel.find({
      comments: { _id: req.body.id },
    });
    req.id = summaryComments.id;
    return next();
  } catch (e) {
    res.send(404, { message: "Ошибка при удалении коментария" });
  }
};

export const checkSummaryByParams = async (req, res, next) => {
  try {
    const summary = await SummaryModel.findOne({ _id: req.params.id });
    req.id = summary.id;
    return next();
  } catch (e) {
    res.send(404, { message: "Резюме не найдено" });
  }
};
