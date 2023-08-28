import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const records = await xata.db.classdata.filter(req.body).getMany();
  res.send(records);
};

export default handler;