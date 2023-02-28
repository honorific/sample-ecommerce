import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utilities/db';

const handler = nc();
handler.patch(async (req, res) => {
  await db.connect();
  const orderId = req.query.id;
  Order.findByIdAndUpdate(
    orderId,
    req.body,
    { returnOriginal: false },
    (err, data) => {
      if (err) {
        res.status(404).json({ message: 'couldnt update', error: err });
      } else {
        res.status(200).json(data);
      }
    }
  );
  await db.disconnect(orderId);
});

export default handler;
