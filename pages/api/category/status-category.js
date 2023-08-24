import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { data,status } = req.body;
  const record = await xata.db.category.update(data.id,{
    link:data.link,
    phoneNumber:data.phoneNumber,
    status:status,
    title:data.title,
    type: data.type,
    ask_price:data.ask_price,
    requirement:data.requirement,
    status:status, 
  });

  res.send(record);
};

export default handler;