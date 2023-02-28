import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utilities/db';

const handler = nc();
handler.get(async (req, res) => {
  const param = req.query.productSlug;
  await db.connect();
  const result = await Product.findOne({ slug: param });
  await db.disconnect();
  res.status(200).json({ result });
});

export default handler;
