import { TokenModel } from "../models";

const getToken = async (_, response) => {
  try {
    const tokens = await TokenModel.find();
    response.send(200, { data: tokens });
  } catch (e) {
    response.send(404, { message: "Ошибка при выполнении запроса" });
  }
};

const delToken = (request, response) => {
  try {
    TokenModel.remove({
      _id: request.params.id,
    });
    response.send(200, { message: "Токен удален" });
  } catch (e) {
    response.send(404, { message: "Ошибка при удалении токена" });
  }
};

const getTokenById = async (request, response) => {
  try {
    const currentToken = await TokenModel.find({ token: request.token });
    response.send(200, { data: currentToken });
  } catch (e) {
    response.send(404, { message: "Ошибка при получении токена" });
  }
};

export { getToken, delToken, getTokenById };
