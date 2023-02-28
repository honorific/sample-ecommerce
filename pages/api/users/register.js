import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utilities/db';
import { signToken } from '../../../utilities/auth';

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  newUser.save((err, data) => {
    if (err) {
      res.status(401).send({ message: 'Invalid user or password' });
    } else {
      res.status(200).json({
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: signToken(data),
      });
    }
  });
  await db.disconnect();
});

export default handler;
