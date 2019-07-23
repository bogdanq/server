import { SummaryModel, TokenModel, UsersModel } from "../models";
import pick from "lodash/pick";

const getUsers = async (_, response) => {
  try {
    const result = await UsersModel.find();
    response.send(200, { data: result });
  } catch (e) {
    response.send(404, { message: "Ошибка запроса" });
  }
};

const signUp = async (request, response) => {
  try {
    const user = await UsersModel.create(
      pick(request.body, UsersModel.createFields),
    );
    response.send(200, { data: user });
  } catch ({ message }) {
    response.send(404, { message });
  }
};

const signIn = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.send(404, { message: "Неверный логин и пароль" });
  }

  const user = await UsersModel.findOne({ email });

  if (!user) {
    response.send(404, { message: "Неверный логин" });
  }

  if (!user.comparePasswords(password)) {
    response.send(404, { message: "Неверный пароль" });
  }

  const token = Math.random(1, 100000);

  const newUserToken = new TokenModel({
    userEmail: email,
    token,
  });

  try {
    await newUserToken.save();
    response.send(200, {
      data: user,
      token,
    });
  } catch (e) {
    response.send(404, {
      message: e,
    });
  }
};

const deleteUser = async (request, response) => {
  try {
    await UsersModel.remove({
      _id: request.params.id,
    });
    response.send(200, { message: "Пользователь удален" });
  } catch (e) {
    response.send(404, { message: "Пользователь не найден" });
  }
};

const currentUser = async (request, response) => {
  try {
    const user = await UsersModel.findOne({ email: request.userEmail });
    response.send(200, { data: user });
  } catch (e) {
    response.send(404, { message: "Неверный токен" });
  }
};

const getSummaries = async (request, response) => {
  const userEmail = request.userEmail;
  if (!userEmail)
    response.send(404, { message: "userEmail обязательный параметр" });

  try {
    const user = await SummaryModel.find({
      userEmail,
    });
    response.send(200, { data: user });
  } catch (e) {
    response.send(404, { message: "Пользователь не найден" });
  }
};

const updateFavoriteSummary = async (id, { userEmail }, methood) =>
  await UsersModel.updateOne(
    { email: userEmail },
    { [methood]: { favoriteSummry: id } },
  );

const toggleSummary = async (request, response) => {
  const id = request.id;
  if (!id) response.send(404, { message: "id обязательный параметр" });

  try {
    const user = await UsersModel.findOne({ email: request.userEmail });
    if (user.favoriteSummry.indexOf(id) === -1) {
      updateFavoriteSummary(id, request, "$push");
      response.send(200, { message: "Добавил в избранное" });
    } else {
      updateFavoriteSummary(id, request, "$pull");
      response.send(200, { message: "Удалил из избранного" });
    }
  } catch (e) {
    response.send(404, { message: "Неверный пользователь" });
  }
};

const getCurrentSummary = async (request, response) => {
  try {
    const summary = await SummaryModel.findOne({
      _id: request.params.id,
    });
    response.send(200, { data: summary });
  } catch (e) {
    response.send(404, { message: "Резюме не найдено" });
  }
};

export {
  signUp,
  signIn,
  deleteUser,
  getUsers,
  currentUser,
  getSummaries,
  toggleSummary,
  getCurrentSummary,
};
