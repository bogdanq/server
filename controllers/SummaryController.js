import pick from "lodash/pick";
import { SummaryModel, TokenModel } from "../models";
import { search } from "../helpers/search";

const addSummary = async (request, response) => {
  try {
    const newSummary = await SummaryModel.create({
      ...pick(request.body, SummaryModel.createFields),
      userEmail: request.userEmail,
    });
    response.send(200, { data: newSummary });
  } catch (e) {
    response.send(404, { message: "При добавлении резюме произошла ошибка" });
  }
};

const delSummary = async (request, response) => {
  try {
    const summary = await SummaryModel.remove({
      _id: request.id,
    });
    response.json(200, { data: summary });
  } catch (e) {
    response.send(404, { status: "Произошла ошибка при удалении резюме" });
  }
};

const updateSummary = async (req, res) => {
  const _id = req.params.id;
  const { authorization } = req.headers;

  const token = await TokenModel.find({ token: authorization });
  const summary = await SummaryModel.findOne({ _id });

  if (token.length < 1) {
    res.send(404, { message: "invalid token" });
  }

  if (summary.userEmail !== token[0].userEmail) {
    res.send(404, { message: "Ошибка при обновлении резюме" });
  }

  const newData = pick(req.body, SummaryModel.createFields);

  summary.set(newData);

  const updateSummary = await summary.save();

  res.json({ data: updateSummary });
};

const searchSummary = async (req, res) => {
  const MAX_SIZE = 20;
  const PAGE = 1;
  const queryParams = pick(req.query, ["title", "tags", "size", "page"]);

  const filter = {
    title: queryParams.title ? queryParams.title : "",
    tags: queryParams.tags ? queryParams.tags.split(",") : [],
    size: parseInt(queryParams.size),
    page: parseInt(queryParams.page),
  };

  if (!filter.size || filter.size > MAX_SIZE) {
    filter.size = MAX_SIZE;
  }

  if (!filter.page) {
    filter.page = PAGE;
  }

  const { summaries, ...rest } = await search(filter);

  res.json({
    data: summaries,
    filter,
    ...rest,
  });
};

const getByEmail = async (request, response) => {
  try {
    const favoriteSummary = await SummaryModel.find({
      userEmail: request.params.id,
    });
    response.send(200, { data: favoriteSummary });
  } catch (e) {
    response.send(404, { message: "Произошла ошибка запроса" });
  }
};

const addComments = async (request, response) => {
  try {
    await SummaryModel.updateOne(
      { _id: request.params.id },
      { $push: { comments: request.body } },
    );
    response.send(200, { data: request.body });
  } catch (e) {
    response.send(404, { message: "При запросе произошла ошибка" });
  }
};

const deleteComments = async (request, response) => {
  try {
    await SummaryModel.updateOne(
      { _id: request.params.id },
      { $pull: { comments: { _id: request.id } } },
    );
    response.send(200, { message: "Коментарий удален" });
  } catch (e) {
    response.send(404, { message: "При запросе произошла ошибка" });
  }
};

const getCurrentSummary = async (request, response) => {
  try {
    const summary = await SummaryModel.findOne({
      _id: request.id,
    });
    response.json(200, { data: summary });
  } catch (e) {
    response.send(404, { status: "Произошла ошибка при получении резюме" });
  }
};

export {
  addSummary,
  delSummary,
  updateSummary,
  searchSummary,
  getByEmail,
  addComments,
  deleteComments,
  getCurrentSummary,
};
