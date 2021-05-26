import type { NextApiRequest, NextApiResponse } from "next";
import database from "../../../src/utils/database";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const reviews = database.review.find({});
  res.status(200).json(reviews ?? []);
};
