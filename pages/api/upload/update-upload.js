import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { id, subcategory,file,title,uploadType, about } = req.body;
  const results = await xata.db.classdata.createOrUpdate(id,{
    subcategory,
    file,
    title,
    uploadType,
    about
  });
  res.send(results);
};

export default handler;