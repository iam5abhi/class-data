// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { id, name, categoryName, aboutFirst, aboutSecond} = req.body;
  const results = await xata.db.subcategory.createOrUpdate(id,{
     name, categoryName,aboutFirst,aboutSecond });
  res.send(results);
};

export default handler;
