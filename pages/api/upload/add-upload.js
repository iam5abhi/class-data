import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {
  await xata.db.classdata.create(req.body);
  res.send();
};

export default handler;
