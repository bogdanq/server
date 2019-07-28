import pick from "lodash/pick";
import { JobsModel } from "../models";

const addJobs = async (request, response) => {
  try {
    const newJobs = await JobsModel.create({
      ...pick(request.body, JobsModel.createFields),
      userEmail: request.userEmail,
    });
    response.send(200, { data: newJobs });
  } catch (e) {
    response.send(404, { message: "При добавлении работы произошла ошибка" });
  }
};

const getJobs = async (_, response) => {
  try {
    const jobs = await JobsModel.find();
    response.send(200, { data: jobs });
  } catch (e) {
    response.send(404, { message: "При получении работы произошла ошибка" });
  }
};

const getJobsByEmail = async (request, response) => {
  try {
    const userJobs = await JobsModel.find({
      userEmail: request.userEmail,
    });
    response.send(200, { data: userJobs });
  } catch (e) {
    response.send(404, { message: "При получении работы произошла ошибка" });
  }
};

const removeJobs = async (request, response) => {
  try {
    const summary = await JobsModel.remove({
      _id: request.id,
    });
    response.json(200, { data: `Вакансия ${request.id} удалена` });
  } catch (e) {
    response.send(404, { message: "Произошла ошибка при удалении вакансии" });
  }
};

const getCurrentJobs = async (request, response) => {
  try {
    const jobs = await JobsModel.findOne({
      _id: request.id,
    });
    response.json(200, { data: jobs });
  } catch (e) {
    response.send(404, { status: "Произошла ошибка при получении вакансии" });
  }
};

const updateJobs = async (req, res) => {
  const _id = req.params.id;
  const currentJobs = await JobsModel.findOne({ _id });
  const newJobs = pick(req.body, JobsModel.createFields);
  currentJobs.set(newJobs);
  try {
    const updateJobs = await currentJobs.save();
    res.send(200, { data: updateJobs });
  } catch (e) {
    res.send(404, { message: "Произошла ошибка при обновлении вакансии" });
  }
};

export {
  addJobs,
  getJobs,
  getJobsByEmail,
  removeJobs,
  getCurrentJobs,
  updateJobs,
};
