import { SummaryModel } from "../models";

export const search = async function({ tags, size, page, title }) {
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
