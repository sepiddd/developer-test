import type { NextApiRequest, NextApiResponse } from "next";
import database from "../../../src/utils/database";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);
  const review = database.review.get(id);
  if (!review) {
    return res.status(404).end(`no review with id ${id} found`);
  }

  // handle get by id
  if (req.method === "GET") {
    return res.status(200).json(review);
  }

  // handle update
  if (req.method === "PUT") {
    const update = database.review.update({
      ...review,
      ...req.body,
    });
    return res.status(200).json(update);
  }

  // handle delete
  if (req.method === "DELETE") {
    database.review.remove(id);
    return res.status(200).end();
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
