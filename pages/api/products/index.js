import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utilities/db';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  const result = await Product.find();
  await db.disconnect();
  res.status(200).json({ result });
});

export default handler;
