import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utilities/db';
import { isAuth } from '../../../utilities/auth';

const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  newOrder.save((err, data) => {
    if (err) {
      console.log('body :', req.body, 'user : ', req.user._id);
      res
        .status(500)
        .send({ message: 'failed to save the order in database', error: err });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
  await db.disconnect();
});

export default handler;
