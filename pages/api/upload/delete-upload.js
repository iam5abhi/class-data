import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { id } = req.body;
  await xata.db.classdata.delete(id);
  res.send();
};

export default handler;