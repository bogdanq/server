import SummaryModel from "../../models/Summary";
import TokenModel from "../../models/Token";

const search = async function({ tags, size, page, title }) {
  const query = {
    title: { $regex: title },
  };

  if (tags.length) {
    query.tags = { $in: tags };
  }

  const count = await SummaryModel.count(query).sort({ updatedAt: "-1" });

  let pages = count / size;

  if (pages.toString().indexOf(".") !== -1) {
    pages = parseInt(pages) + 1;
  }

  const summaries = await SummaryModel.find(query)
    .sort({ updatedAt: "-1" })
    .limit(size)
    .skip((page - 1) * size);

  return {
    summaries,
    count,
    pages,
    page,
  };
};

const privateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const session = await TokenModel.findOne({ token });
    req.userEmail = session.userEmail;
    return next();
  } catch (e) {
    res.send(404, { message: "Неправильный токен" });
  }
};

const checkSummary = async (req, res, next) => {
  try {
    const summary = await SummaryModel.findOne({ _id: req.body.id });
    req.id = summary.id;
    return next();
  } catch (e) {
    res.send(404, { message: "резюме не найдено" });
  }
};

export { search, privateUser, checkSummary };
