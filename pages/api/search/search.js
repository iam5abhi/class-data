import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { term } = req.query;
 
  const results = await xata.search.all(term, {
    tables: [
      {
        table: 'homePage',
        target: ['name', 'username', 'meta.description', 'meta.location']
      }
    ],
    fuzziness: 1,
    prefix: 'phrase'
  });
 
  const enrichedResults = results.map((result) => {
    return {
      ...result,
      ...result.record.getMetadata()
    };
  });
 
  res.json(enrichedResults);

};

export default handler;

