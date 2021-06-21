import type { NextApiRequest, NextApiResponse } from "next";
import database from "../../../src/utils/database";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const insert = database.review.insert({
      ...req.body,
    });
    return res.status(200).json(insert);
  }
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
