import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utilities/db';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  const orderId = req.query.id;
  Order.findById(orderId, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'couldnt find', error: err });
    } else {
      res.status(200).json({ data });
    }
  });
  await db.disconnect(orderId);
});

export default handler;
