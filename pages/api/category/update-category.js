// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { id,name } = req.body;
  const results = await xata.db.category.createOrUpdate(id,{
    name,
  });
  res.send(results);
};

export default handler;
