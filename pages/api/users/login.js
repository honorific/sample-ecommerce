import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utilities/db';
import { signToken } from '../../../utilities/auth';

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (!user) {
    res.status(401).send({ message: 'Invalid user or password' });
  }
  if (bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: signToken(user),
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
});

export default handler;
