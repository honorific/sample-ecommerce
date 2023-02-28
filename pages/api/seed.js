import nc from 'next-connect';
import User from '../../models/User';
import data from '../../utilities/Data';
import db from '../../utilities/db';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  const result = await User.insertMany(data.users);
  await db.disconnect();
  res.status(200).json({ result });
});

export default handler;
